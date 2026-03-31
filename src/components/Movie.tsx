import type { OMDbSearchMovie } from "../types"
import { MoviePoster } from "./MoviePoster"

interface MovieProps {
  movie: OMDbSearchMovie;
  onSelectMovie: (id: string) => void;
}

export function Movie({ movie, onSelectMovie }: MovieProps) 
{
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <MoviePoster src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span className="icon-badge">📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}
