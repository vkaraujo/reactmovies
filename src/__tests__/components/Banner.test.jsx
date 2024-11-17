import { render, screen } from '@testing-library/react';
import { Banner } from '../../components/Banner';

describe('Banner Component', () => {
  test('renders the Banner with title and description', () => {
    render(<Banner titulo="Test Title" descricao="Test Description" categoria="filmes" />);

    // Check if title is rendered
    expect(screen.getByText('Test Title')).toBeInTheDocument();

    // Check if description is rendered
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('applies the correct background for "filmes"', () => {
    render(<Banner titulo="Test Title" descricao="Test Description" categoria="filmes" />);

    // Check if the correct class is applied
    const banner = screen.getByText('Test Title').closest('div');
    expect(banner).toHaveClass('bg-filmes');
  });

  test('applies the correct background for "series"', () => {
    render(<Banner titulo="Test Title" descricao="Test Description" categoria="series" />);

    // Check if the correct class is applied
    const banner = screen.getByText('Test Title').closest('div');
    expect(banner).toHaveClass('bg-series');
  });

  test('applies the default background when categoria is not provided', () => {
    render(<Banner titulo="Test Title" descricao="Test Description" />);

    // Check if the default class is applied
    const banner = screen.getByText('Test Title').closest('div');
    expect(banner).toHaveClass('bg-black');
  });
});
