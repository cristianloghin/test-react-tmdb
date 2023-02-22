import { ApiConfig, SearchResults, Details } from '@/client/models';
import { rest } from 'msw';
import { mockMovies } from './data';

const API_PATH = 'https://api.themoviedb.org/3';

export const handlers = [
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ greeting: 'hello there' }));
  }),
  rest.get(`${API_PATH}/configuration`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<ApiConfig>({ images: { base_url: 'http://test.org' } })
    );
  }),
  rest.get(`${API_PATH}/search/movie`, (req, res, ctx) => {
    const query = req.url.searchParams.get('query');
    const page = req.url.searchParams.get('page') || '1';

    if (query === 'Invalid name') {
      return res(
        ctx.status(200),
        ctx.json<SearchResults>({
          page: Number(page),
          total_pages: 0,
          total_results: 0,
          results: [],
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json<SearchResults>({
        page: Number(page),
        total_pages: 10,
        total_results: 200,
        results: mockMovies(20),
      })
    );
  }),
  rest.get(`${API_PATH}/movie/:movieId`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json<Details>({
        id: Number(id),
        title: 'The Day',
        release_date: '2020-02-01',
        credits: {
          cast: [
            {
              id: 421645216,
              name: 'Bob',
              character: 'Bill',
              order: 0,
              profile_path: '1234567',
            },
          ],
        },
      })
    );
  }),
];
