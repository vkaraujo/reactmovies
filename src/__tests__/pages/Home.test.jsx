import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '../../pages/Home';

describe('Home Page', () => {
    test('renders the Home page with links to Filmes and Séries', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        // Verify the Filme link
        const filmeLink = screen.getAllByRole('link')[0]; // Get the first <Link>
        expect(filmeLink).toBeInTheDocument();
        expect(filmeLink).toHaveAttribute('href', '/filmes');

        // Verify the Série link
        const serieLink = screen.getAllByRole('link')[1]; // Get the second <Link>
        expect(serieLink).toBeInTheDocument();
        expect(serieLink).toHaveAttribute('href', '/series');

        // Check that images are rendered
        const images = screen.getAllByRole('img');
        expect(images.length).toBe(2); // One for each section
        expect(images[0]).toHaveAttribute('src', expect.stringContaining('capa-filmes.jpg'));
        expect(images[1]).toHaveAttribute('src', expect.stringContaining('capa-series.jpg'));

        // Verify text content
        expect(screen.getByText('Filmes')).toBeInTheDocument();
        expect(screen.getByText('Séries')).toBeInTheDocument();
    });
});
