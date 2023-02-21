import { useAppDispatch, setMovieId } from '@/store';
import { useConfig } from '@/hooks/config';
import { useDetails } from '@/hooks/search';

function MovieDetails() {
  const { image_base_url } = useConfig();
  const { data } = useDetails();
  const dispatch = useAppDispatch();

  function goBack() {
    dispatch(setMovieId(null));
  }

  return (
    <div>
      <p>Show details about movie</p>
      <img src={`${image_base_url}/w1280/${data?.backdrop_path || ''}`} />
      <button onClick={goBack}>Go Back</button>
    </div>
  );
}

export default MovieDetails;
