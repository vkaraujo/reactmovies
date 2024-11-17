import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../../components/SearchBar';

describe('SearchBar Component', () => {
  test('renders input and button', () => {
    render(<SearchBar onSearch={vi.fn()} />);

    // Check if input and button are rendered
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('updates input value when typing', () => {
    render(<SearchBar onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText('Search...');

    // Simulate typing in the input
    fireEvent.change(input, { target: { value: 'Test Query' } });

    // Check if the input value updates
    expect(input.value).toBe('Test Query');
  });

  test('calls onSearch with correct parameters on valid input', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });

    // Simulate typing a query and submitting the form
    fireEvent.change(input, { target: { value: 'Valid Query' } });
    fireEvent.click(button);

    // Check if onSearch is called with the correct parameters
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('Valid Query', true);
  });

  test('calls onSearch with empty query on empty input', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const button = screen.getByRole('button', { name: /search/i });

    // Simulate submitting the form without typing
    fireEvent.click(button);

    // Check if onSearch is called with empty query and false
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('', false);
  });
});
