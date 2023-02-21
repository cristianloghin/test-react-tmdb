import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from './setup';
import App from '@/App';

describe('App', () => {
  it('renders headline', async () => {
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent(
      'Find your favorite movie on The Movie Database!'
    );
  });

  it('renders search bar', async () => {
    render(<App />);
    const searchContainer = screen.getByRole('search');
    expect(searchContainer).toBeInTheDocument();
  });

  it('renders placeholder in search field', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(
      'Please enter movie title...'
    );
    expect(searchInput).toBeInTheDocument();
  });

  it('renders a search button', async () => {
    render(<App />);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchButton).toBeInTheDocument();
  });

  it('renders an empty list at start', async () => {
    render(<App />);
    const noContent = screen.getByRole('status');
    expect(noContent).toHaveTextContent('No results to display');
  });

  it('renders a list of movies when a search is performed', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByRole('textbox');
    // Enter a movie to search for
    await user.type(searchInput, 'Foo man chu');
    expect(searchInput).toHaveValue('Foo man chu');

    // Click the search button
    const searchButton = screen.getByRole('button', { name: 'Search' });
    await user.click(searchButton);

    // Show results
    const results = await screen.findByRole('list');
    expect(results).toBeInTheDocument();
    expect(results.childElementCount).toBe(20);
  });

  it('renders movie details', () => {});

  it('renders more search results on scroll', () => {});
});
