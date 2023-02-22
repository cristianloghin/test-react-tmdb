import SearchBar from '@/components/SearchBar';
import ResultList from '@/components/ResultList';
import MovieDetails from '@/components/Details';
import styles from './App.module.scss';
import { useAppSelector } from './store';

function App() {
  const movieId = useAppSelector((state) => state.main.movieId);
  const searchQuery = useAppSelector((state) => state.main.query);

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
      {movieId ? (
        <MovieDetails />
      ) : (
        <>
          <SearchBar />
          {searchQuery && <ResultList />}
        </>
      )}
    </div>
  );
}

export default App;
