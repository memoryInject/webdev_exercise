import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserData } from '../UserCreationForm';
import SkillEdit from '../SkillEdit';
import axios from 'axios';

test('add/remove skill to a user', async () => {
  // Mocke setState dispatch action
  const update: React.Dispatch<React.SetStateAction<boolean>> = (
    state: React.SetStateAction<boolean>
  ) => { };

  const { data: user } = await axios.get<UserData>(
    `${process.env.API_HOST}/users/3`
  );

  render(<SkillEdit user={user} update={update} />);

  expect(screen.getByText(/python/)).toBeDefined();

  // Get the text fields
  const skillField = screen.getByTestId('skill-text');

  // Get the submit button
  const submitBtn = screen.getByTestId('skill-add-btn');

  // Type new text
  await userEvent.type(skillField, 'javascript');

  // Submit new user
  await userEvent.click(submitBtn);

  // Check if the data updated after adding a skill
  const { data: userUpdated } = await axios.get<UserData>(
    `${process.env.API_HOST}/users/3`
  );

  expect(userUpdated.skills).includes('javascript');
});
