import { MouseEvent } from 'react';
import { useAppDispatch, setMovieId } from '@/store';
import useSearch from '@/hooks/search';
import styles from './ResultList.module.scss';

function ResultList() {
  const dispatch = useAppDispatch();
  const { data, fetchNextPage, hasNextPage } = useSearch();

  const showMovieDetails = (id: number) => (event: MouseEvent) => {
    event.preventDefault();
    dispatch(setMovieId(id));
  };

  return (
    <div>
      {!data ? (
        <div role='status' aria-label='Search results'>
          No results to display.
        </div>
      ) : (
        <div className={styles.MovieList} role='list'>
          <>
            {data?.map((movie) => (
              <div className={styles.MovieCard} role='listitem' key={movie.id}>
                <button type='button' onClick={showMovieDetails(movie.id)}>
                  {movie.poster_path && (
                    <div className={styles.Poster}>
                      <img src={movie.poster_path} alt={movie.title} />
                    </div>
                  )}
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date.split('-')[0]}</p>
                </button>
              </div>
            ))}
          </>
        </div>
      )}
      <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          {hasNextPage ? 'Show More' : 'Nothing more to load'}
        </button>
      </div>
    </div>
  );
}

export default ResultList;
