import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders DeliveryScout text in the logo', () => {
    render(<App />);

    // Query the logo by its aria-label and role as banner
    const logoElement = screen.getByRole('banner'); // Find the header role
    expect(logoElement).toHaveTextContent(/DeliveryScout/i); // Ensure it contains the correct text
  });

  it('renders DeliveryScout text in the footer', () => {
    render(<App />);

    // Query the footer by its role and check for the content
    const footerElement = screen.getByRole('contentinfo'); // Find the footer role
    expect(footerElement).toHaveTextContent(/DeliveryScout/i); // Ensure it contains the correct text
  });
});
