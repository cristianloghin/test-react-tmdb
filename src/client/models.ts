export interface ApiConfig {
  images: {
    base_url: string;
    secure_base_url?: string;
    backdrop_sizes?: 'w300' | 'w780' | 'w1280' | 'original';
    logo_sizes?: 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original';
    poster_sizes?:
      | 'w92'
      | 'w154'
      | 'w185'
      | 'w342'
      | 'w500'
      | 'w780'
      | 'original';
    profile_sizes?: 'w45' | 'w185' | 'h632' | 'original';
    still_sizes?: 'w92' | 'w185' | 'w300' | 'original';
  };
  change_keys?: string[];
}

export interface Result {
  poster_path?: string;
  adult?: boolean;
  overview?: string;
  release_date: string;
  genre_ids?: number[];
  id: number;
  original_title?: string;
  original_language?: string;
  title: string;
  backdrop_path?: string;
  popularity?: number;
  vote_count?: number;
  video?: boolean;
  vote_average?: number;
}

export interface SearchResults {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Details extends Omit<Result, 'genre_ids'> {
  belongs_to_collection?: object;
  budget?: number;
  genres?: object[];
  homepage?: string;
  imdb_id?: string;
  production_companies?: object[];
  production_countries?: object[];
  revenue?: number;
  runtime?: number;
  spoken_languages?: object[];
  status?: string;
  tagline?: string;
  credits: {
    cast: Cast[];
    crew?: object[];
  };
}

type Cast = {
  adult?: boolean;
  cast_id?: number;
  character: string;
  credit_id?: string;
  gender?: number;
  id: number;
  known_for_department?: string;
  name: string;
  order: number;
  original_name?: string;
  popularity?: number;
  profile_path: string;
};
