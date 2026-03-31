import { WatchedMovie } from "./WatchedMovie"
import type { WatchedMovie as WatchedMovieItem } from "../types"

interface WatchedMoviesListProps {
  watched: WatchedMovieItem[];
  onDeleteWatched: (id: string) => void;
}


export function WatchedMoviesList({ watched, onDeleteWatched }: WatchedMoviesListProps) 
{
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched} 
        />
      )
      )}
    </ul>
  )
}
