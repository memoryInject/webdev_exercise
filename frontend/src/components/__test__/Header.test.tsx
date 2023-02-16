import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

test('footer', () => {
  render(<Header />);
  expect(screen.getByText(/Work-Genius/)).toBeDefined();
});
