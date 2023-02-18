import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Users, { ResponseData, getUsersUrl } from '../users';
import axios from 'axios';

import { users } from '../../setupTest';

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

test('show list of users', async () => {
  // Mock getServerSideProps
  const { data } = await axios.get<ResponseData>(getUsersUrl);

  render(<Users data={data} />);

  expect(screen.getByText(users[0].username)).toBeDefined();
  expect(screen.getByText(users[1].username)).toBeDefined();
});
