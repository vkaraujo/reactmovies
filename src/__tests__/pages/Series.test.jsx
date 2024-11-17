import { render, screen } from '@testing-library/react';
import { Series } from '../../pages/Series';
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

describe('Series Page', () => {
  test('renders the Series page with a Banner and List', () => {
    render(<Series />);

    // Verify Banner
    const banner = screen.getByTestId('banner');
    expect(banner).toBeInTheDocument();
    expect(screen.getByText('Séries')).toBeInTheDocument();
    expect(
      screen.getByText('Confira o que é sucesso nas TVs do mundo!')
    ).toBeInTheDocument();

    // Verify Banner contains "series"
    const bannerCategoria = screen.getAllByText('series')[0];
    expect(bannerCategoria).toBeInTheDocument();

    // Verify List
    const list = screen.getByTestId('list');
    expect(list).toBeInTheDocument();

    // Verify List contains "series"
    const listCategoria = screen.getAllByText('series')[1];
    expect(listCategoria).toBeInTheDocument();
  });
});
