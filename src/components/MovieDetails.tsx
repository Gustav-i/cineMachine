import { useState, useRef, useEffect } from "react"
import { API_KEY } from "../data"
import { Loader } from "./Loader"
import { MoviePoster } from "./MoviePoster"
import StarRating from "./StarRating"
import type { OMDbMovieDetails, WatchedMovie } from "../types"

interface MovieDetailsProps {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: WatchedMovie) => void;
  watched: WatchedMovie[];
}


export function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }: MovieDetailsProps) 
{
  const [movie, setMovie] = useState<OMDbMovieDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState(0)

  const countRef = useRef(0)

  useEffect(
    function () 
    {
      if (userRating) countRef.current++

    }, [userRating]
  )

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId)?.userRating

  const
  {
    Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre,
  } = movie ?? {}

  function handleAdd() 
  {
    const newWatchedMovie = 
    {
      imdbID: selectedId,
      title: title ?? "",
      year: year ?? "",
      poster: poster ?? "",
      imdbRating: Number(imdbRating ?? 0),
      runtime: Number(runtime?.split(" ")[0] ?? 0),
      userRating,
      countRatingDecisions: countRef.current,
    }

    onAddWatched(newWatchedMovie)
    onCloseMovie()
  }

  useEffect(
    function () 
    {
      function callback(e: KeyboardEvent) 
      {
        if (e.code === "Escape") 
        {
          onCloseMovie()
        }
      }

      document.addEventListener("keydown", callback)

      return function () 
      {
        document.removeEventListener("keydown", callback)
      }

    }, [onCloseMovie]
  )

  useEffect(
    function () 
    {
      async function getMovieDetails() 
      {
        setIsLoading(true)
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`)

        const data = (await res.json()) as OMDbMovieDetails

        setMovie(data)
        setIsLoading(false)
      }
      getMovieDetails()

    }, [selectedId]
  )

  useEffect(
    function () 
    {
      if (!title) return
      document.title = `Movie | ${title}`

      return function () 
      {
        document.title = "cineMachine"
      }

    }, [title]
  )

  return (
    <div className="details">
      {isLoading ? (<Loader />) :
        (
          <>
            <header>
              <button className="btn-toggle" onClick={onCloseMovie} aria-label="Close movie details">
                ✖
              </button>
              <MoviePoster src={poster} alt={`Poster of ${title ?? "selected"} movie`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>{genre}</p>
                <p>
                  <span className="icon-badge">⭐</span>
                  {imdbRating} IMDb rating
                </p>
              </div>
            </header>

            <section>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRating
                      maxRating={10}
                      size={24}
                      onSetRating={setUserRating} />
                    {userRating > 0 && (
                      <button className="btn-add" onClick={handleAdd}>
                        + Add to list
                      </button>
                    )}
                  </>
                ) : (
                  <p>
                    You rated with movie {watchedUserRating} <span className="icon-badge">⭐</span>
                  </p>
                )}
              </div>
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </>
        )}
    </div>
  )
}
