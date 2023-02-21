import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchResults } from '@/client/api';
import useConfig from './config';
import { formatData } from './utils';
import { useAppSelector } from '@/store';

export default () => {
  const { image_base_url } = useConfig();
  const queryString = useAppSelector((store) => store.query.value);
  const queryKey = queryString ? queryString.toLowerCase().split(' ') : [];

  const query = useInfiniteQuery(
    ['search', ...queryKey],
    ({ pageParam = 1 }) =>
      fetchResults(encodeURI(queryString || ''), pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.total_pages == pages.length) {
          return undefined;
        }
        return pages.length + 1;
      },
      enabled: !!queryString && !!image_base_url,
      staleTime: Infinity,
    }
  );

  return {
    ...query,
    data:
      image_base_url && query.data
        ? formatData(image_base_url, query.data.pages)
        : undefined,
  };
};
