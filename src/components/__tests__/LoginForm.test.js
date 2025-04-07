import { render, screen, fireEvent, waitFor } from '@testing-library/react'; 
import LoginForm from '../LoginForm';
import axios from 'axios';

jest.mock('axios');

beforeEach(() => {
  jest.spyOn(Storage.prototype, 'setItem'); // Mocking setItem for localStorage
});

afterEach(() => {
  jest.restoreAllMocks(); // Clean up after each test
});

describe('LoginForm', () => {
  it('renders login form and handles login submission', async () => {
    // Mock successful login
    axios.post.mockResolvedValueOnce({
      data: { access_token: 'fake_token' }
    });

    render(<LoginForm setToken={() => {}} setShowLogin={() => {}} />);

    // Ensure labels are correctly associated with inputs using htmlFor
    const emailLabel = screen.getByLabelText(/email/i);
    const passwordLabel = screen.getByLabelText(/password/i);

    // Fill out the login form
    fireEvent.change(emailLabel, { target: { value: 'testuser@example.com' } });
    fireEvent.change(passwordLabel, { target: { value: 'password123' } });

    // Simulate the form submission
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    // Check if the submit button is disabled during loading
    expect(submitButton).toBeDisabled();

    // Wait for the API call to finish and ensure the submit button is enabled again
    await waitFor(() => expect(submitButton).toBeEnabled());

    // Check if the login was successful
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake_token');
  });

  it('shows an error message for invalid credentials', async () => {
    // Mock failed login
    axios.post.mockRejectedValueOnce({
      response: { data: { msg: 'Invalid credentials' }, status: 401 }
    });

    render(<LoginForm setToken={() => {}} setShowLogin={() => {}} />);

    // Fill in the wrong credentials
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'wronguser@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' }
    });

    // Simulate the form submission
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    // Wait for the error message to appear
    const errorMsg = await screen.findByText(/Login failed\. Check your credentials\./i);
    expect(errorMsg).toBeInTheDocument();
  });
});
