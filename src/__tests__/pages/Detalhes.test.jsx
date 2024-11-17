import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Detalhes } from '../../pages/Detalhes';

// Mock useParams to provide necessary route parameters
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123', categoria: 'filmes' }), // Mock params
  };
});

// Mock the API function
vi.mock('../../api/tmdb', () => ({
  getDataId: vi.fn(() =>
    Promise.resolve({
      title: 'Example Movie',
      backdrop_path: '/example.jpg',
      poster_path: '/example-poster.jpg',
      first_air_date: '2020-01-01',
      vote_average: 8.5,
      overview: 'This is an example movie.',
    })
  ),
}));

test('renders Detalhes component with movie data', async () => {
  render(
    <BrowserRouter>
      <Detalhes />
    </BrowserRouter>
  );

  // Wait for the title to appear
  const title = await screen.findByText('Example Movie');
  expect(title).toBeInTheDocument();

  // Check for other details
  expect(screen.getByText('Ano: 2020')).toBeInTheDocument();
  expect(screen.getByText('Avaliação: 8.5')).toBeInTheDocument();
});



