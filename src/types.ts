export interface OMDbSearchMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type?: string;
  Poster: string;
}

export interface OMDbSearchResponse {
  Response: "True" | "False";
  Search?: OMDbSearchMovie[];
  Error?: string;
}

export interface WatchedMovie {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
  imdbRating: number;
  runtime: number;
  userRating: number;
  countRatingDecisions: number;
}

export interface OMDbMovieDetails {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
  Response: "True" | "False";
  Error?: string;
}
