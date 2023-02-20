import SearchBar from '@/components/SearchBar';
import ResultList from '@/components/ResultList';
import { useSearch } from '@/hooks/search';
import { useConfig } from './hooks/config';
import styles from './App.module.scss';

function App() {
  const config = useConfig();
  const {
    data,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    search,
  } = useSearch(config?.images.base_url);

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <div className={styles.Logo}>
          <a href='https://www.themoviedb.org/' target='_blank'>
            <img src='/tmdb.svg' className='logo' alt='TMDB logo' />
          </a>
        </div>
        <h1>Find your favorite movie on The Movie Database!</h1>
      </header>
      <SearchBar search={search} />
      <ResultList
        data={data}
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}

export default App;
