import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector, setQuery } from '@/store';

function SearchBar() {
  const query = useAppSelector((state) => state.main.query);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<string>(query || '');

  function submitForm(e: FormEvent) {
    e.preventDefault();
    // Update search value
    dispatch(setQuery(input));
  }

  return (
    <form onSubmit={submitForm}>
      <div role='search'>
        <label htmlFor='search-field'>Search</label>
        <input
          id='search-field'
          type='text'
          name='search'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Please enter movie title...'
        />
        <input type='submit' value='Search' />
      </div>
    </form>
  );
}

export default SearchBar;
