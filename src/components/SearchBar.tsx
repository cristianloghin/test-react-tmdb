import { FormEvent, useState } from 'react';

function SearchBar({ search }: { search: (v: string) => void }) {
  const [input, setInput] = useState<string>('');

  function submitForm(e: FormEvent) {
    e.preventDefault();
    // Update search value
    search(input);
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
