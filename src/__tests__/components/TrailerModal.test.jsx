import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TrailerModal } from '../../components/TrailerModal';
import { getDataVideos } from '../../api/tmdb';

// Mock the API function
vi.mock('../../api/tmdb', () => ({
  getDataVideos: vi.fn(() => Promise.resolve([
      { type: "Trailer", site: "YouTube", key: "exampleKey" }
  ])),
}));

describe('TrailerModal Component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders nothing when isOpen is false', () => {
    render(<TrailerModal categoria="filmes" id="123" isOpen={false} onClose={mockOnClose} />);

    expect(screen.queryByText('Close')).not.toBeInTheDocument();
  });

  test('renders the modal when isOpen is true', () => {
    render(<TrailerModal categoria="filmes" id="123" isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  test('calls onClose when the close button is clicked', () => {
    render(<TrailerModal categoria="filmes" id="123" isOpen={true} onClose={mockOnClose} />);

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('displays the trailer iframe when a trailer is available', async () => {
    getDataVideos.mockResolvedValue([
      { type: 'Trailer', site: 'YouTube', key: 'test-key' },
    ]);

    render(<TrailerModal categoria="filmes" id="123" isOpen={true} onClose={mockOnClose} />);

    await waitFor(() => {
      const iframe = screen.getByTitle('Trailer');
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/test-key');
    });
  });

  test('displays "No trailer available." when no trailer is found', async () => {
    getDataVideos.mockResolvedValue([]);

    render(<TrailerModal categoria="filmes" id="123" isOpen={true} onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByText('No trailer available.')).toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    getDataVideos.mockRejectedValue(new Error('API Error'));

    render(<TrailerModal categoria="filmes" id="123" isOpen={true} onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByText('No trailer available.')).toBeInTheDocument();
    });

    expect(getDataVideos).toHaveBeenCalledTimes(1);
  });

  test("handles undefined response from getDataVideos", async () => {
    getDataVideos.mockResolvedValue(undefined);

    render(<TrailerModal categoria="filmes" id="1" isOpen={true} onClose={vi.fn()} />);
    await waitFor(() => expect(screen.getByText("No trailer available.")).toBeInTheDocument());
  });
});
