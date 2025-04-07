import { render, screen, fireEvent } from '@testing-library/react';
import ResultsList from '../ResultsList';

describe('ResultsList', () => {
  const mockResults = [
    {
      provider_name: 'Royal Mail',
      service_name: 'Standard Delivery',
      price_gbp: 5.99,
      delivery_speed: '3-5 days',
      carbon_rating: 'Low',
      website_url: 'https://www.royalmail.com'
    }
  ];

  it('renders delivery options and visits website', () => {
    // Mock window.open to prevent actual window from opening during the test
    const windowOpenSpy = jest.spyOn(window, 'open').mockImplementation(() => {});

    render(<ResultsList results={mockResults} />);

    // Check if the delivery options are rendered
    expect(screen.getByText(/royal mail/i)).toBeInTheDocument();
    expect(screen.getByText(/£5.99/i)).toBeInTheDocument();
    expect(screen.getByText(/Standard Delivery/i)).toBeInTheDocument();

    // Check the "Visit Website" button
    const button = screen.getByText(/Visit Website/i);
    expect(button).toBeInTheDocument();

    // Simulate the click event on the "Visit Website" button
    fireEvent.click(button);

    // Ensure window.open is called with the correct URL and parameters
    expect(windowOpenSpy).toHaveBeenCalledWith('https://www.royalmail.com/', '_blank');
    expect(windowOpenSpy).toHaveBeenCalledTimes(1);

    // Clean up the spy after the test
    windowOpenSpy.mockRestore();
  });
});
