import { useEffect, MouseEvent } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppDispatch, setMovieId } from '@/store';
import { useSearch } from '@/hooks/search';
import styles from './ResultList.module.scss';

function ResultList() {
  const dispatch = useAppDispatch();
  const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } =
    useSearch();

  const { ref, inView } = useInView({ threshold: 1 });

  const showMovieDetails = (id: number) => (event: MouseEvent) => {
    event.preventDefault();
    dispatch(setMovieId(id));
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

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
                <a
                  href='https://google.com'
                  onClick={showMovieDetails(movie.id)}
                >
                  {movie.poster_path && (
                    <div className={styles.Poster}>
                      <img src={movie.poster_path} alt={movie.title} />
                    </div>
                  )}
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date.split('-')[0]}</p>
                </a>
              </div>
            ))}
          </>
        </div>
      )}
      {hasNextPage && (
        <div
          ref={ref}
          style={{
            height: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p>Scroll to load more...</p>
        </div>
      )}
      <div>
        {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
      </div>

      {/* <div>
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
        >
          {hasNextPage ? 'Load Newer' : 'Nothing more to load'}
        </button>
      </div> */}
    </div>
  );
}

export default ResultList;
