import { useState } from "react";

export default function AddMovieForm({ onAddMovie }) {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddMovie({
      id: Date.now(),
      title,
      poster,
      genre,
      year: Number(year),
      rating: Number(rating),
      watched: false,
    });

    setTitle("");
    setPoster("");
    setGenre("");
    setYear("");
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">
        Add Movie
      </h2>

      <input
        type="text"
        placeholder="Movie Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full mb-3"
      />

      <input
        type="text"
        placeholder="Poster URL"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
        className="input input-bordered w-full mb-3"
      />

      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="input input-bordered w-full mb-3"
      />

      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="input input-bordered w-full mb-3"
      />

      <div className="mb-4">
        <label className="block mb-2">
          Rating: {rating}
        </label>

        <input
          type="range"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="range"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
      >
        Add Movie
      </button>
    </form>
  );
}