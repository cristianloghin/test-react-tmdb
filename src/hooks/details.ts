import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/store';
import useConfig from './config';
import { fetchMovieDetails } from '@/client/api';
import { Details } from '@/client/models';

export default () => {
  const { image_base_url } = useConfig();
  const movieId = useAppSelector((state) => state.movie.value);

  const query = useQuery(
    ['movie', movieId],
    () => fetchMovieDetails(movieId || 0),
    {
      enabled: !!movieId,
      staleTime: Infinity,
    }
  );

  return {
    ...query,
    data:
      image_base_url && query.data
        ? ({
            ...query.data,
            backdrop_path: `${image_base_url}/w1280/${query.data.backdrop_path}`,
          } as Details)
        : undefined,
  };
};
