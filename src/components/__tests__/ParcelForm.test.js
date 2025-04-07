import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ParcelForm from '../ParcelForm';
import axios from 'axios';

jest.mock('axios');

describe('ParcelForm', () => {
  it('renders the form and handles form submission', async () => {
    render(<ParcelForm setResults={jest.fn()} />);

    // Check if form elements are rendered
    expect(screen.getByLabelText(/length/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/weight/i)).toBeInTheDocument();

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/length/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/width/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/height/i), { target: { value: '8' } });
    fireEvent.change(screen.getByLabelText(/weight/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/destination/i), { target: { value: 'UK' } });

    // Mock API response
    axios.post.mockResolvedValue({ data: { results: [] } });

    // Submit the form
    fireEvent.click(screen.getByText(/compare delivery options/i));

    // Wait for the result
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  });

  it('shows an error message if a required field is missing', async () => {
    render(<ParcelForm setResults={jest.fn()} />);

    // Submit form with empty fields
    fireEvent.click(screen.getByText(/compare delivery options/i));

    // Check for error message
    expect(screen.getByText(/Please fill out all fields/i)).toBeInTheDocument();
  });
});
