export default function SummaryBar({ movies }) {
  const total = movies.length;
  const watched = movies.filter((movie) => movie.watched).length;
  const unwatched = total - watched;

  return (
    <div className="stats shadow mb-6 w-full">
      <div className="stat">
        <div className="stat-title">Total</div>
        <div className="stat-value">{total}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Watched</div>
        <div className="stat-value">{watched}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Unwatched</div>
        <div className="stat-value">{unwatched}</div>
      </div>
    </div>
  );
}
