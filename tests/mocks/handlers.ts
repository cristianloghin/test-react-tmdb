import { ApiConfig, SearchResults } from '@/client/models';
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
    const page = req.url.searchParams.get('page') || '1';
    const results = mockMovies(20);
    return res(
      ctx.status(200),
      ctx.json<SearchResults>({
        page: Number(page),
        total_pages: 10,
        total_results: 200,
        results,
      })
    );
  }),
];
