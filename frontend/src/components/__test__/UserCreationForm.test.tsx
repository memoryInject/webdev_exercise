import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserCreationForm, { UserData } from '../UserCreationForm';
import axios from 'axios';

vi.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
      },
      beforePopState: vi.fn(() => null),
      prefetch: vi.fn(() => null),
    };
  },
}));

test('create a new user', async () => {
  render(<UserCreationForm />);

  expect(screen.getByText(/Create User/)).toBeDefined();

  // Before submit check the number of users
  const { data: beforeData } = await axios.get<UserData[]>(
    `${process.env.API_HOST}/users/`
  );

  // Get the text fields
  const usernameField = screen.getByTestId('form-username');
  const emailField = screen.getByTestId('form-email');
  const firstnameField = screen.getByTestId('form-firstname');
  const lastnameField = screen.getByTestId('form-lastname');

  // Get the submit button
  const submitBtn = screen.getByTestId('form-submit');

  // Type new text
  await userEvent.type(usernameField, 'foo123');
  await userEvent.type(emailField, 'foo123@example.com');
  await userEvent.type(firstnameField, 'foo');
  await userEvent.type(lastnameField, 'bar');

  // Submit new user
  await userEvent.click(submitBtn);

  // Wait for a sec
  await new Promise((r) => setTimeout(r, 100));

  // After submit check the number of users
  const { data: afterData } = await axios.get<UserData[]>(
    `${process.env.API_HOST}/users/`
  );
  expect(afterData.length).toEqual(beforeData.length + 1);
});
