import { useAppDispatch, setMovieId } from '@/store';
import useDetails from '@/hooks/details';

function MovieDetails() {
  const { data, isLoading } = useDetails();
  const dispatch = useAppDispatch();

  function goBack() {
    dispatch(setMovieId(null));
  }

  function getScore(average: number) {
    return Math.round(average * 10) + '%';
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <h2>{data?.title}</h2>
      <p>{data?.overview}</p>
      <div>
        {data?.credits.cast.map((actor) => (
          <div key={actor.id}>{actor.name}</div>
        ))}
      </div>
      <div>{data?.vote_average && getScore(data.vote_average)}</div>
      <img src={data?.backdrop_path} />
      <button onClick={goBack}>Go Back</button>
    </section>
  );
}

export default MovieDetails;
