import { Result, SearchResults } from '@/client/models';

export function formatData(base_url: string, pages: SearchResults[]) {
  return pages.reduce(
    (acc: Result[], curr) =>
      acc.concat(
        curr.results
          .filter((m) => m.poster_path)
          .map((m) => ({
            ...m,
            poster_path: `${base_url}w185${m.poster_path}`,
          }))
      ),
    []
  );
}
