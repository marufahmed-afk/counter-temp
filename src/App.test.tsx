import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hello text', () => {
  render(<App />);
  const helloText = screen.getByText('Hello');
  expect(helloText).toBeInTheDocument();
});
