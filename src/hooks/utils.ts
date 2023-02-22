import { CastMember, Result, SearchResults } from '@/client/models';

function sliceTitle(title: string) {
  const sliced = title.slice(0, 32);
  if (sliced != title) {
    return sliced + '...';
  }
  return title;
}

export function formatData(base_url: string, pages: SearchResults[]) {
  return pages.reduce(
    (acc: Result[], curr) =>
      acc.concat(
        curr.results.map((m) => ({
          ...m,
          title: sliceTitle(m.title),
          poster_path: m.poster_path
            ? `${base_url}w185${m.poster_path}`
            : undefined,
        }))
      ),
    []
  );
}

export function formatCredits(
  base_url: string,
  credits: { cast: CastMember[]; crew?: any }
) {
  return {
    cast: credits.cast
      .sort((c) => c.order)
      .slice(0, 10)
      .map((c) => ({
        ...c,
        profile_path: c.profile_path
          ? `${base_url}w185${c.profile_path}`
          : undefined,
      })),
  };
}
