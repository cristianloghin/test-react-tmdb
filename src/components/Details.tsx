import { useAppDispatch, setMovieId } from '@/store';
import { CastMember as CastMemberType } from '@/client/models';
import useDetails from '@/hooks/details';
import noPhotoPath from '@/assets/no-photo.png';
import styles from './Details.module.scss';

function MovieScore({ score }: { score: number }) {
  return (
    <div
      className={styles.MovieScore}
      style={{
        // offset the background gradient to change color
        backgroundPosition: `calc(-${Math.round(48 * score)}px + 48px) 0`,
      }}
    >
      {score.toPrecision(2)}
    </div>
  );
}

function CastMember({ actor }: { actor: CastMemberType }) {
  return (
    <div className={styles.CastMember}>
      <div
        className={styles.Profile}
        style={{ backgroundImage: `url(${actor.profile_path || noPhotoPath})` }}
      ></div>
      <h4>{actor.name}</h4>
      <p>{actor.character}</p>
    </div>
  );
}

function MovieDetails() {
  const { data, isLoading } = useDetails();
  const dispatch = useAppDispatch();

  function goBack() {
    dispatch(setMovieId(null));
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className={styles.MovieDetails}>
      {data?.backdrop_path && (
        <div className={styles.MovieBanner}>
          <span></span>
          <img src={data.backdrop_path} alt={data?.title} />
        </div>
      )}
      <div className={styles.MovieInfo}>
        <h2>
          {data?.title}
          {data?.vote_average && <MovieScore score={data.vote_average} />}
        </h2>
        <p>{data?.overview}</p>
        <h3>Top billed cast</h3>
        <div className={styles.MovieCast}>
          {data?.credits.cast.map((actor) => (
            <CastMember key={actor.id} actor={actor} />
          ))}
        </div>
        <div className={styles.BackButton}>
          <button className='button action' onClick={goBack}>
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
