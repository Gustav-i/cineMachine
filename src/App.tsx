import { useEffect, useState } from "react"
import { API_KEY } from "./data"
import { Loader } from "./components/Loader"
import { ErrorMessage } from "./components/ErrorMessage"
import { NavBar } from "./components/NavBar"
import { Search } from "./components/Search"
import { NumResults } from "./components/NumResults"
import { MainHeader } from "./components/MainHeader"
import { Box } from "./components/Box"
import { MovieList } from "./components/MovieList"
import { MovieDetails } from "./components/MovieDetails"
import { WatchedSummary } from "./components/WatchedSummary"
import { WatchedMoviesList } from "./components/WatchedMoviesList"
import type { OMDbSearchMovie, OMDbSearchResponse, WatchedMovie } from "./types"

// const apiKey = process.env.REACT_APP_API_KEY

// console.log(apiKey); // abc123supersecreta


export default function App() 
{
  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState<OMDbSearchMovie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const trimmedQuery = query.trim()
  const showInitialMessage = trimmedQuery.length === 0
  const showMinCharsMessage = trimmedQuery.length > 0 && trimmedQuery.length < 3

  const [watched, setWatched] = useState<WatchedMovie[]>(() => 
  {
    const storedValue = localStorage.getItem("watched")
    if (!storedValue) return []

    try 
    {
      const parsedValue = JSON.parse(storedValue) as WatchedMovie[]
      return Array.isArray(parsedValue) ? parsedValue : []
    } 
    catch 
    {
      return []
    }
  })

  function handleSelectMovie(id: string) 
  {
    setSelectedId((selectedId) => (id === selectedId ? null : id))
  }

  function handleCloseMovie() 
  {
    setSelectedId(null)
  }

  function handleAddWatched(movie: WatchedMovie) 
  {
    setWatched((watched) => [...watched, movie])
  }

  function handleDeleteWatched(id: string) 
  {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }

  useEffect(
    function () 
    {
      localStorage.setItem("watched", JSON.stringify(watched))
    },
    [watched]
  )

  useEffect(
    function () 
    {
      const controller = new AbortController()

      async function fetchMovies() 
      {
        try 
        {
          setIsLoading(true)
          setError("")

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
            { signal: controller.signal }
          )

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies")

          const data = (await res.json()) as OMDbSearchResponse

          if (data.Response === "False") 
            throw new Error(data.Error ?? "Movie not found")

          setMovies(data.Search ?? [])
          setError("")
        } 
        catch (err: unknown) 
        {
          if (err instanceof Error && err.name !== "AbortError") 
          {
            console.log(err.message)
            setError(err.message)
          }
        } 
        finally 
        {
          setIsLoading(false)
        }
      }

      if (query.length < 3) 
      {
        setMovies([])
        setError("")
        return
      }

      handleCloseMovie()
      fetchMovies()

      return function () 
      {
        controller.abort()
      }

    }, [query]
  )

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <MainHeader>
        <Box className="box-search-results">
          {isLoading && <Loader />}
          {!isLoading && !error && !showInitialMessage && !showMinCharsMessage && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {!isLoading && showInitialMessage && (
            <div className="empty-state">
              <span className="empty-state-icon">🎬</span>
              <h2>Your next film is here...</h2>
              <p>Search for a movie to see details, ratings, and create your watch list.</p>
            </div>
          )}
          {!isLoading && !error && showMinCharsMessage && (
            <div className="empty-state empty-state-compact">
              <span className="empty-state-icon">⌕</span>
              <p>Type at least 3 characters to start the search.</p>
            </div>
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box className="box-watched">
          {selectedId ? 
            (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList
                  watched={watched}
                  onDeleteWatched={handleDeleteWatched}
                />
              </>
            )
          }
        </Box>
      </MainHeader>
    </>
  )
}
