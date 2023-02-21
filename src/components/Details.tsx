import { useAppDispatch, setMovieId } from '@/store';
import useDetails from '@/hooks/details';

function MovieDetails() {
  const { data, isLoading } = useDetails();
  const dispatch = useAppDispatch();

  function goBack() {
    dispatch(setMovieId(null));
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.overview}</p>
      <div>
        {data?.credits.cast.map((actor) => (
          <div>{actor.name}</div>
        ))}
      </div>
      <img src={data?.backdrop_path} />
      <button onClick={goBack}>Go Back</button>
    </div>
  );
}

export default MovieDetails;
