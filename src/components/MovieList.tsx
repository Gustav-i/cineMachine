import { Movie } from "./Movie"
import type { OMDbSearchMovie } from "../types"

interface MovieListProps {
  movies: OMDbSearchMovie[];
  onSelectMovie: (id: string) => void;
}


export function MovieList({ movies, onSelectMovie }: MovieListProps) 
{
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  )
}
