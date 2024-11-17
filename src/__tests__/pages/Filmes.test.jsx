import { render, screen } from '@testing-library/react';
import { Filmes } from '../../pages/Filmes';
import { vi } from 'vitest';

// Mock the child components
vi.mock('../../components/Banner', () => ({
  Banner: ({ titulo, descricao, categoria }) => (
    <div data-testid="banner">
      <h1>{titulo}</h1>
      <p>{descricao}</p>
      <span>{categoria}</span>
    </div>
  ),
}));

vi.mock('../../components/List', () => ({
  List: ({ categoria }) => <div data-testid="list">{categoria}</div>,
}));

describe('Filmes Page', () => {
  test('renders the Filmes page with a Banner and List', () => {
    render(<Filmes />);

    // Verify Banner
    const banner = screen.getByTestId('banner');
    expect(banner).toBeInTheDocument();
    expect(screen.getByText('Filmes')).toBeInTheDocument();
    expect(
      screen.getByText('Confire as maiores produções do cinema mundial')
    ).toBeInTheDocument();

    // Verify Banner contains "filmes"
    const bannerCategoria = screen.getAllByText('filmes')[0];
    expect(bannerCategoria).toBeInTheDocument();

    // Verify List
    const list = screen.getByTestId('list');
    expect(list).toBeInTheDocument();

    // Verify List contains "filmes"
    const listCategoria = screen.getAllByText('filmes')[1];
    expect(listCategoria).toBeInTheDocument();
  });
});
