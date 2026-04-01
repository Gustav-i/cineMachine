import { average } from "../utils"
import type { WatchedMovie } from "../types"

interface WatchedSummaryProps {
  watched: WatchedMovie[];
}


export function WatchedSummary({ watched }: WatchedSummaryProps) 
{
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating))
  const avgUserRating = average(watched.map((movie) => movie.userRating))
  const avgRuntime = average(watched.map((movie) => movie.runtime))

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p className="summary-item">
          <span className="icon-badge summary-icon">🎞</span>
          <span className="summary-value">{watched.length} movies</span>
        </p>
        <p className="summary-item">
          <span className="icon-badge summary-icon">⭐</span>
          {avgImdbRating ? <span className="summary-value">{avgImdbRating.toFixed(1)}</span> : <span className="summary-value">0</span>}
        </p>
        <p className="summary-item">
          <span className="icon-badge summary-icon">✦</span>
          {avgUserRating ? <span className="summary-value">{avgUserRating.toFixed(1)}</span> : <span className="summary-value">0</span>}
        </p>
        <p className="summary-item">
          <span className="icon-badge summary-icon">⏱</span>
          {avgRuntime ? <span className="summary-value">{avgRuntime.toFixed(2)} min</span> : <span className="summary-value">0 min</span> }
        </p>
      </div>
    </div>
  )
}
