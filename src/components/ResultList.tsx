import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Result } from '@/client/api';
import styles from './ResultList.module.scss';

function ResultList({
  data,
  fetchNextPage,
  isFetching,
  isFetchingNextPage,
  hasNextPage,
}: {
  data: Result[] | undefined;
  fetchNextPage: () => void;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
}) {
  const { ref, inView } = useInView({ threshold: 1 });

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
                {movie.poster_path && (
                  <div className={styles.Poster}>
                    <img src={movie.poster_path} alt={movie.title} />
                  </div>
                )}
                <h3>{movie.title}</h3>
                <p>{movie.release_date.split('-')[0]}</p>
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
