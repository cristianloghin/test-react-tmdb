import { Result } from '@/client/models';

function mockMovie(): Result {
  return {
    poster_path: '12526175hasgdhjg',
    release_date: '2020-02-01',
    id: Math.floor(100000 + Math.random() * 900000),
    title: 'Once upon a mime',
  };
}

export function mockMovies(total: number) {
  return [...new Array(total)].map((el) => mockMovie());
}
