import { useState, useEffect } from "react";
import Layout from "./layouts/Layout";
import MovieList from "./components/MovieList";
import moviesData from "./data/movies";
import AddMovieForm from "./components/AddMovieForm";
import FilterBar from "./components/FilterBar";
import SummaryBar from "./components/SummaryBar";
import SearchBar from "./components/SearchBar";
import { searchMovies, toWatchlistMovie } from "./api/tmdb";
import SearchResults from "./components/SearchResults";

export default function App() {
  const [movies, setMovies] = useState(() => {
  const saved = localStorage.getItem("movies");

  return saved ? JSON.parse(saved) : moviesData;
});

const [filter, setFilter] = useState(() => {
  return localStorage.getItem("filter") || "all";
});

const [query, setQuery] = useState("");
const [results, setResults] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

  useEffect(() => {
  localStorage.setItem("movies", JSON.stringify(movies));
}, [movies]);

useEffect(() => {
  document.title = `My Watchlist (${movies.length})`;
}, [movies.length]);

useEffect(() => {
  localStorage.setItem("filter", filter);
}, [filter]);

useEffect(() => {
  if (!query) {
    setResults([]);
    return;
  }

  const fetchMovies = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await searchMovies(query);
      setResults(data.map(toWatchlistMovie));
    } catch (err) {
      console.error(err);
      setError("Failed to load movies.");
    } finally {
      setLoading(false);
    }
  };

  fetchMovies();
}, [query]);


  const handleToggleWatched = (id) => {
  setMovies(
    movies.map((movie) =>
      movie.id === id
        ? { ...movie, watched: !movie.watched }
        : movie
    )
  );
};

const handleDeleteMovie = (id) => {
  setMovies(
    movies.filter((movie) => movie.id !== id)
  );
};

const handleAddMovie = (newMovie) => {
  setMovies([...movies, newMovie]);
};

const handleAddFromSearch = (movie) => {
  setMovies([...movies, movie]);
};

const handleClearAll = () => {
  if (confirm("Clear your entire watchlist? This cannot be undone.")) {
    setMovies([]);
  }
};

const visibleMovies = movies.filter((movie) => {
  if (filter === "watched") return movie.watched;
  if (filter === "unwatched") return !movie.watched;
  return true;
});
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Watchlist</h1>
        <p className="opacity-70">
          A collection of movies I've watched and want to watch.
        </p>
      </div>

      <SearchBar onSearch={setQuery} />

      <SearchResults
        results={results}
        onAdd={handleAddFromSearch}
        isLoading={loading}
        error={error}
      />

      <hr className="my-6" />

      <AddMovieForm onAddMovie={handleAddMovie} />

      <SummaryBar movies={movies} />
      <button className="btn btn-error btn-sm" onClick={handleClearAll}>
        Clear All
      </button>

      <FilterBar
        currentFilter={filter}
        onChangeFilter={setFilter}
      />

      <MovieList
        movies={visibleMovies}
        onToggleWatched={handleToggleWatched}
        onDelete={handleDeleteMovie}
      />
    </Layout>
  );
}
