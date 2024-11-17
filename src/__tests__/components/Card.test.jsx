import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Card } from '../../components/Card';

const mockItem = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test-poster.jpg',
  first_air_date: '2020-01-01',
  vote_average: 8.5,
};

describe('Card Component', () => {
  test('renders the Card with movie data', () => {
    render(
      <MemoryRouter>
        <Card item={mockItem} categoria="filmes" />
      </MemoryRouter>
    );

    // Check if the title is rendered
    expect(screen.getByText('Test Movie')).toBeInTheDocument();

    // Check if the year is rendered
    expect(screen.getByText('Ano 2020')).toBeInTheDocument();

    // Check if the rating is rendered
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  test('renders placeholder image when poster_path is missing', () => {
    const itemWithoutPoster = { ...mockItem, poster_path: null };

    render(
      <MemoryRouter>
        <Card item={itemWithoutPoster} categoria="filmes" />
      </MemoryRouter>
    );

    // Check if the placeholder image is used
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', expect.stringContaining('placeholder.jpg'));
  });

  test('renders correct link based on categoria and item id', () => {
    render(
      <MemoryRouter>
        <Card item={mockItem} categoria="filmes" />
      </MemoryRouter>
    );

    // Check if the link points to the correct URL
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/detalhes/filmes/1');
  });
});
