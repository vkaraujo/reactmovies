import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../../components/Header';

describe('Header Component', () => {
  test('renders the logo with correct attributes', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Check if the logo is rendered with the correct src and alt attributes
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', expect.stringContaining('logo.svg'));
  });

  test('renders navigation links with correct text and hrefs', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Check if the navigation links are rendered with correct text and hrefs
    const homeLink = screen.getByText('Início');
    expect(homeLink).toHaveAttribute('href', '/');

    const filmesLink = screen.getByText('Filmes');
    expect(filmesLink).toHaveAttribute('href', '/filmes');

    const seriesLink = screen.getByText('Séries');
    expect(seriesLink).toHaveAttribute('href', '/series');
  });

  test('applies the correct classes to the header', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Check if the header has the correct class
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-brand-dark fixed top-0 z-10 w-full bg-opacity-20 backdrop-blur-sm flex flex-col gap-y-2 md:flex-row justify-between items-center p-6');
  });
});
