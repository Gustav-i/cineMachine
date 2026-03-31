import type { WatchedMovie as WatchedMovieItem } from "../types"
import { MoviePoster } from "./MoviePoster"

interface WatchedMovieProps {
  movie: WatchedMovieItem;
  onDeleteWatched: (id: string) => void;
}

export function WatchedMovie({ movie, onDeleteWatched }: WatchedMovieProps) 
{
  return (
    <li>
      <MoviePoster src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span className="icon-badge">⭐</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span className="icon-badge">✦</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span className="icon-badge">🎞</span>
          {movie.runtime ? <span>{movie.runtime} min</span> : <span>? min</span>}
        </p>

        <button
          className="btn-delete"
          aria-label={`Remove ${movie.title} from watched list`}
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          <svg className="trash-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm1 7h2v8h-2v-8Zm4 0h2v8h-2v-8ZM8 10h2v8H8v-8Z" />
          </svg>
        </button>
      </div>
    </li>
  )
}
