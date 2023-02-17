import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type GType = {
  greeting: string;
};

async function fetchData(url: string): Promise<GType> {
  const res = await axios.get(url);
  return res.data;
}

function Fetch({ url }: { url: string }) {
  const { data, error, refetch } = useQuery<GType, Error>(
    [url],
    () => fetchData(url),
    { enabled: false }
  );

  return (
    <div>
      {data && <h1>{data.greeting}</h1>}
      {error && <p role='alert'>Oops, failed to fetch!</p>}
      <button onClick={() => refetch()} disabled={!!data?.greeting}>
        Load Greeting
      </button>
    </div>
  );
}

export default Fetch;
