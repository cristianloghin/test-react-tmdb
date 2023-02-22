import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector, setQuery } from '@/store';
import clearIcon from '@/assets/icon-clear.svg';
import searchIcon from '@/assets/icon-search.svg';
import styles from './SearchBar.module.scss';

function SearchBar() {
  const query = useAppSelector((state) => state.main.query);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<string>(query || '');

  function submitForm(e: FormEvent) {
    e.preventDefault();
    // Update search value
    dispatch(setQuery(input));
  }

  function clearSearch() {
    setInput('');
    dispatch(setQuery(undefined));
  }

  return (
    <section className={styles.SearchBar}>
      <form onSubmit={submitForm}>
        <div role='search'>
          <div className={styles.SearchIcon}>
            {query ? (
              <button
                className={`button ${styles.ClearSearch}`}
                type='button'
                onClick={clearSearch}
              >
                <img src={clearIcon} alt='Clear results' />
              </button>
            ) : (
              <img src={searchIcon} alt='Search' />
            )}
          </div>
          <label className='sr-only' htmlFor='search-field'>
            Search
          </label>
          <input
            id='search-field'
            type='text'
            name='search'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Please enter movie title...'
          />
          <input className='button action' type='submit' value='Search' />
        </div>
      </form>
    </section>
  );
}

export default SearchBar;
