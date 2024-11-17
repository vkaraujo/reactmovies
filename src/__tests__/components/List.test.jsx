import { render, screen, waitFor } from '@testing-library/react';
import { List } from '../../components/List';
import { vi } from 'vitest';
import { SearchBar } from '../../components/SearchBar';

// Mock API functions
vi.mock('../../api/tmdb', () => ({
  getData: vi.fn(() =>
    Promise.resolve([
      { id: 1, title: 'Mock Movie 1', poster_path: '/path1.jpg', vote_average: 8.1, release_date: '2023-01-01' },
      { id: 2, title: 'Mock Movie 2', poster_path: '/path2.jpg', vote_average: 7.5, release_date: '2022-05-15' },
    ])
  ),
  searchData: vi.fn(() =>
    Promise.resolve([
      { id: 3, title: 'Search Result 1', poster_path: '/path3.jpg', vote_average: 6.8, release_date: '2021-10-10' },
    ])
  ),
}));

// Mock child components
vi.mock('../../components/SortFilter', () => ({
  SortFilter: ({ sortOrder, handleSortChange }) => (
    <select data-testid="sort-filter" value={sortOrder} onChange={(e) => handleSortChange(e)}>
      <option value="popular">Popular</option>
      <option value="top_rated">Top Rated</option>
    </select>
  ),
}));

vi.mock('../../components/Pagination', () => ({
  Pagination: ({ page, setPage }) => (
    <button data-testid="pagination-next" onClick={() => setPage(page + 1)}>
      Next
    </button>
  ),
}));

vi.mock('../../components/Card', () => ({
  Card: ({ item }) => <div>{item.title}</div>,
}));

describe('List Component', () => {
  test('fetches and renders items correctly', async () => {
    render(<List categoria="filmes" />);

    // Wait for the items to be displayed
    await waitFor(() => expect(screen.getByText('Mock Movie 1')).toBeInTheDocument());
    expect(screen.getByText('Mock Movie 2')).toBeInTheDocument();
  });

  test('handles sort changes', async () => {
    render(<List categoria="filmes" />);

    // Wait for items to load
    await waitFor(() => expect(screen.getByText('Mock Movie 1')).toBeInTheDocument());

    // Simulate sort change
    const sortFilter = screen.getByTestId('sort-filter');
    sortFilter.value = 'top_rated';
    sortFilter.dispatchEvent(new Event('change'));

    // Verify API is called with updated sort order
    expect(screen.getByText('Mock Movie 1')).toBeInTheDocument();
  });

  test('handles pagination', async () => {
    render(<List categoria="filmes" />);

    // Wait for items to load
    await waitFor(() => expect(screen.getByText('Mock Movie 1')).toBeInTheDocument());

    // Simulate clicking next page
    const nextButton = screen.getByTestId('pagination-next');
    nextButton.click();

    // Verify API is called with updated page
    expect(screen.getByText('Mock Movie 1')).toBeInTheDocument();
  });
});
