import { useState } from 'react';

function Fetch({ url }: { url: string }) {
  const [data, setData] = useState<{ greeting: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchData(url: string) {
    const response = await fetch(url);
    if (response.status === 200) {
      setData(await response.json());
    } else {
      setError('Oops, failed to fetch!');
    }
  }

  return (
    <div>
      {data && <h1>{data.greeting}</h1>}
      {error && <p role='alert'>{error}</p>}
      <button onClick={() => fetchData(url)} disabled={!!data?.greeting}>
        Load Greeting
      </button>
    </div>
  );
}

export default Fetch;
