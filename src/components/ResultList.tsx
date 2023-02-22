import { MouseEvent } from 'react';
import { useAppDispatch, setMovieId } from '@/store';
import noPosterPath from '@/assets/no-poster.png';
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
      {data?.length === 0 ? (
        <div
          className={styles.NoResults}
          role='status'
          aria-label='Search results'
        >
          No results to display 😢
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
                  className='button'
                  aria-labelledby={String(movie.id)}
                  onClick={showMovieDetails(movie.id)}
                >
                  <div
                    className={styles.Poster}
                    style={{
                      backgroundImage: `url(${
                        movie.poster_path || noPosterPath
                      })`,
                    }}
                  ></div>

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
      {hasNextPage && (
        <div className={styles.MoreButton}>
          <button
            className='button action'
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
}

export default ResultList;
