import { render, screen } from '@testing-library/react';
import { Footer } from '../../components/Footer';

describe('Footer Component', () => {
    test('renders the Footer with the correct text', () => {
      render(<Footer />);
  
      // Check if the footer text is rendered
      expect(screen.getByText('Projeto desenvolvido por: Viktor Araujo')).toBeInTheDocument();
    });
  
    test('applies the correct classes', () => {
      render(<Footer />);
  
      // Check if the footer element has the correct classes
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('w-full bg-brand-dark text-center p-4 fixed bottom-0');
    });
  });