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
    <section>
      {!data ? (
        <div role='status' aria-label='Search results'>
          No results to display.
        </div>
      ) : (
        <div className={styles.MovieList} role='list'>
          <>
            {data?.map((movie) => (
              <article
                className={styles.MovieCard}
                role='listitem'
                key={movie.id}
              >
                <button
                  type='button'
                  aria-labelledby={String(movie.id)}
                  onClick={showMovieDetails(movie.id)}
                >
                  {movie.poster_path && (
                    <div className={styles.Poster}>
                      <img src={movie.poster_path} alt={movie.title} />
                    </div>
                  )}
                  <h3>
                    <label htmlFor={String(movie.id)}>{movie.title}</label>
                  </h3>
                  <p>{movie.release_date.split('-')[0]}</p>
                </button>
              </article>
            ))}
          </>
        </div>
      )}
      <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          {hasNextPage ? 'Show More' : 'Nothing more to load'}
        </button>
      </div>
    </section>
  );
}

export default ResultList;
