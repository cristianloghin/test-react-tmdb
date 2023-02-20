import axios from 'axios';

export type ApiConfig = {
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
};

export type Result = {
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
};

export type SearchResults = {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
};

const API_KEY = '2f6db91475e701ed85c2d06e5ba590c8';
const API_BASE = 'https://api.themoviedb.org/3';

export async function fetchConfiguration() {
  const res = await axios.get<ApiConfig>(
    `${API_BASE}/configuration?api_key=${API_KEY}`
  );
  return res.data;
}

async function fetchResults(query: string, page: number) {
  const res = await axios.get<SearchResults>(
    `${API_BASE}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`
  );
  return res.data;
}

export { fetchResults };
