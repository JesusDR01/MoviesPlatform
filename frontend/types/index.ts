interface Movie {
  readonly movieID: string
  readonly name: string
  readonly director: string
  readonly year: number
  readonly mean_rating: number
}

type NoMovieID = Omit<Movie, 'movieID'>

export type { Movie, NoMovieID }