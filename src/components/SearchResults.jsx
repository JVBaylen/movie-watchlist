import { getPosterUrl } from "../api/tmdb";

const SearchResults = ({ results, onAdd, isLoading, error }) => {
  if (isLoading) return <p className="text-center">Loading movies...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (results.length === 0) return null;

  return (
    <section className="my-4">
      <h2 className="text-lg font-bold mb-2">Search Results</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {results.map((movie) => (
          <article key={movie.id} className="card bg-base-200">
            <figure>
              <img
                src={getPosterUrl(movie.poster_path)}
                alt={movie.title}
              />
            </figure>

            <div className="card-body p-3">
              <h3 className="text-sm font-semibold">
                {movie.title}
              </h3>

              <p className="text-xs opacity-70">
                {movie.release_date?.slice(0, 4) || "N/A"} · ⭐{" "}
                {movie.vote_average?.toFixed(1) || "—"}
              </p>

              <button
                className="btn btn-primary btn-xs mt-1"
                onClick={() => onAdd(movie)}
              >
                Add to Watchlist
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SearchResults;