import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";


export const searchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });

  return response.data.results;
};


export const getPosterUrl = (path, size = "w342") =>
  path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : "https://placehold.co/342x513?text=No+Poster";

    
export const toWatchlistMovie = (tmdbMovie) => ({
  id: tmdbMovie.id,
  title: tmdbMovie.title,
  poster: getPosterUrl(tmdbMovie.poster_path),
  genre: "Unknown",
  year: tmdbMovie.release_date
    ? Number(tmdbMovie.release_date.slice(0, 4))
    : 0,
  rating: tmdbMovie.vote_average
    ? Number(tmdbMovie.vote_average.toFixed(1))
    : 0,
  watched: false,
});