import axios from 'axios';
import { ApiConfig, SearchResults, Details } from './models';

const API_KEY = '2f6db91475e701ed85c2d06e5ba590c8';
const API_BASE = 'https://api.themoviedb.org/3';

async function fetchConfiguration() {
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

async function fetchMovieDetails(id: number) {
  const res = await axios.get<Details>(
    `${API_BASE}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
  );
  return res.data;
}

export { fetchConfiguration, fetchResults, fetchMovieDetails };
