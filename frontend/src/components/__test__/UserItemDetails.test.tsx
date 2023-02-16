import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserData } from '../UserCreationForm';
import UserItemDetails from '../UserItemDetails';
import axios from 'axios';

test('add/remove skill to a user', async () => {
  const { data: user } = await axios.get<UserData>(
    `${process.env.API_HOST}/users/3`
  );

  render(<UserItemDetails user={user} />);

  expect(screen.getAllByText(/foo/)).toBeDefined();
  expect(screen.getAllByText(/bar/)).toBeDefined();
  expect(screen.getAllByText(/foo@bar.com/)).toBeDefined();
});
