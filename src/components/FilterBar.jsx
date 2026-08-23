export default function FilterBar({
  currentFilter,
  onChangeFilter,
}) {
  return (
    <div className="flex gap-2 mb-6">
      <button
        className={
          currentFilter === "all"
            ? "btn btn-primary"
            : "btn btn-ghost"
        }
        onClick={() => onChangeFilter("all")}
      >
        All
      </button>

      <button
        className={
          currentFilter === "watched"
            ? "btn btn-primary"
            : "btn btn-ghost"
        }
        onClick={() => onChangeFilter("watched")}
      >
        Watched
      </button>

      <button
        className={
          currentFilter === "unwatched"
            ? "btn btn-primary"
            : "btn btn-ghost"
        }
        onClick={() => onChangeFilter("unwatched")}
      >
        Unwatched
      </button>
    </div>
  );
}