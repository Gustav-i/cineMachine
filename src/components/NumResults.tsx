import type { OMDbSearchMovie } from "../types"

interface NumResultsProps {
  movies: OMDbSearchMovie[];
}

export function NumResults({ movies }: NumResultsProps) 
{
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  )
}
