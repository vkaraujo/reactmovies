import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../../components/Pagination';

describe('Pagination Component', () => {
  test('renders the current page', () => {
    const setPage = vi.fn();
    render(<Pagination page={1} setPage={setPage} />);

    // Check if the current page is displayed
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('disables the previous button on the first page', () => {
    const setPage = vi.fn();
    render(<Pagination page={1} setPage={setPage} />);

    // Check if the previous button is disabled
    const prevButton = screen.getByText('←');
    expect(prevButton).toBeDisabled();
  });

  test('enables the previous button on pages greater than 1', () => {
    const setPage = vi.fn();
    render(<Pagination page={2} setPage={setPage} />);

    // Check if the previous button is enabled
    const prevButton = screen.getByText('←');
    expect(prevButton).not.toBeDisabled();
  });

  test('calls setPage with the next page when the next button is clicked', () => {
    const setPage = vi.fn();
    render(<Pagination page={1} setPage={setPage} />);

    // Click the next button
    const nextButton = screen.getByText('→');
    fireEvent.click(nextButton);

    // Check if setPage is called with the correct page
    expect(setPage).toHaveBeenCalledTimes(1);
    expect(setPage).toHaveBeenCalledWith(expect.any(Function));
  });

  test('calls setPage with the previous page when the previous button is clicked', () => {
    const setPage = vi.fn();
    render(<Pagination page={2} setPage={setPage} />);

    // Click the previous button
    const prevButton = screen.getByText('←');
    fireEvent.click(prevButton);

    // Check if setPage is called with the correct page
    expect(setPage).toHaveBeenCalledTimes(1);
    expect(setPage).toHaveBeenCalledWith(expect.any(Function));
  });

  test('does not call setPage when previous button is disabled', () => {
    const setPage = vi.fn();
    render(<Pagination page={1} setPage={setPage} />);

    // Try clicking the disabled previous button
    const prevButton = screen.getByText('←');
    fireEvent.click(prevButton);

    // Check if setPage is not called
    expect(setPage).not.toHaveBeenCalled();
  });
});
