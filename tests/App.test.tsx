import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from './setup';
import App from '@/App';

test('renders headline', async () => {
  render(<App />);
  expect(screen.getByRole('heading')).toHaveTextContent(
    'Find your favorite movie on The Movie Database!'
  );
});

test('renders search bar', async () => {
  render(<App />);
  const searchContainer = screen.getByRole('search');
  expect(searchContainer).toBeInTheDocument();
});

test('renders placeholder in search field', async () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(
    'Please enter movie title...'
  );
  expect(searchInput).toBeInTheDocument();
});

test('renders a search button', async () => {
  render(<App />);
  const searchButton = screen.getByRole('button', { name: 'Search' });
  expect(searchButton).toBeInTheDocument();
});

test('does not render result list at start', async () => {
  render(<App />);
  expect(screen.queryByRole('list')).toBeNull();
});

test('renders a notification if no results are found', async () => {
  const user = userEvent.setup();
  render(<App />);

  const searchInput = screen.getByRole('textbox');
  await user.type(searchInput, 'Invalid name');

  // Press the enter key to search
  await user.keyboard('[Enter]');
  const notification = await screen.findByRole('status');
  const list = await screen.queryByRole('list');

  expect(notification).toBeInTheDocument();
  expect(list).toBeNull();
});

test('renders a list of movies when a search is performed', async () => {
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

test('renders more movies when show more button is clicked', async () => {
  const user = userEvent.setup();
  render(<App />);

  const searchInput = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: 'Search' });
  await user.type(searchInput, 'Foo man chu');
  await user.click(searchButton);

  const results = await screen.findByRole('list');
  expect(results).toBeInTheDocument();
  // Show first 20 results
  expect(results.childElementCount).toBe(20);

  const showMoreButton = screen.getByRole('button', { name: /show more/i });
  expect(showMoreButton).toBeInTheDocument();

  await user.click(showMoreButton);
  // Show 20 more results
  expect(results.childElementCount).toBe(40);
});

test('renders movie details', async () => {
  const user = userEvent.setup();
  render(<App />);

  const searchInput = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: 'Search' });
  await user.type(searchInput, 'Foo man chu');
  await user.click(searchButton);

  const movieCards = await screen.findAllByRole('listitem');
  expect(movieCards.length).toBe(20);

  const movieCardButton = movieCards[0].querySelector('button');

  await user.click(movieCardButton!);
  const title = screen.getByRole('heading', { level: 2 });
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent('The Day');
});

test('returns to the movie list when go back is clicked', async () => {
  const user = userEvent.setup();
  render(<App />);

  const searchInput = await screen.findByRole('textbox');
  const searchButton = screen.getByRole('button', { name: 'Search' });
  await user.type(searchInput, 'Foo man chu');
  await user.click(searchButton);

  const movieCards = await screen.findAllByRole('listitem');
  expect(movieCards.length).toBe(20);

  const movieCardButton = movieCards[0].querySelector('button');

  await user.click(movieCardButton!);
  const goBackButton = screen.getByRole('button', { name: /go back/i });
  expect(goBackButton).toBeInTheDocument();

  await user.click(goBackButton);
  expect(goBackButton).not.toBeInTheDocument();
});
