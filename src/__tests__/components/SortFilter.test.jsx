import { render, screen, fireEvent } from '@testing-library/react';
import { SortFilter } from '../../components/SortFilter';

describe('SortFilter Component', () => {
  const sortOptions = [
    { value: 'popular', label: 'Mais Populares', appliesTo: ['filmes', 'series'] },
    { value: 'top_rated', label: 'Mais Bem Avaliados', appliesTo: ['filmes', 'series'] },
    { value: 'now_playing', label: 'Em Cartaz', appliesTo: ['filmes'] },
    { value: 'upcoming', label: 'Próximos Lançamentos', appliesTo: ['filmes'] },
    { value: 'on_the_air', label: 'No Ar', appliesTo: ['series'] },
    { value: 'airing_today', label: 'Transmitido Hoje', appliesTo: ['series'] },
  ];

  test('renders correct options for filmes category', () => {
    render(
      <SortFilter 
        sortOrder="popular" 
        handleSortChange={vi.fn()} 
        categoria="filmes" 
        sortOptions={sortOptions} 
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    // Check options specific to "filmes"
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4); // popular, top_rated, now_playing, upcoming
    expect(screen.getByText('Mais Populares')).toBeInTheDocument();
    expect(screen.getByText('Em Cartaz')).toBeInTheDocument();
    expect(screen.getByText('Próximos Lançamentos')).toBeInTheDocument();
  });

  test('renders correct options for series category', () => {
    render(
      <SortFilter 
        sortOrder="popular" 
        handleSortChange={vi.fn()} 
        categoria="series" 
        sortOptions={sortOptions} 
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    // Check options specific to "series"
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4); // popular, top_rated, on_the_air, airing_today
    expect(screen.getByText('No Ar')).toBeInTheDocument();
    expect(screen.getByText('Transmitido Hoje')).toBeInTheDocument();
  });

  test('calls handleSortChange when an option is selected', () => {
    const mockHandleSortChange = vi.fn();
    render(
      <SortFilter 
        sortOrder="popular" 
        handleSortChange={mockHandleSortChange} 
        categoria="filmes" 
        sortOptions={sortOptions} 
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'top_rated' } });

    expect(mockHandleSortChange).toHaveBeenCalledTimes(1);
    expect(mockHandleSortChange).toHaveBeenCalledWith(expect.any(Object)); // Ensure the event object is passed
  });

  test('sets the correct initial selected value', () => {
    render(
      <SortFilter 
        sortOrder="top_rated" 
        handleSortChange={vi.fn()} 
        categoria="filmes" 
        sortOptions={sortOptions} 
      />
    );

    const select = screen.getByRole('combobox');
    expect(select.value).toBe('top_rated');
  });
});
