import { render, screen } from '@testing-library/react';
import { NotFound } from '../../pages/NotFound';

describe('NotFound Page', () => {
    test('renders the NotFound page with the correct text', () => {
        render(<NotFound />);
        
        // Verify the "Not Found" text is displayed
        expect(screen.getByText('Not Found')).toBeInTheDocument();
    });
});
