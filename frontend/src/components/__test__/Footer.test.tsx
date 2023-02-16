import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

test('footer', () => {
  render(<Footer />);
  expect(screen.getByText(/Inbox/)).toBeDefined();
});
