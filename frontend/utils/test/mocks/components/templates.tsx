const mockMovieList = jest.fn()
const mockMovieDetail = jest.fn()
const mockCreateMovie = jest.fn()

jest.mock('components/templates', () => {
  const {
    MovieList: MovieListComponent,
    MovieDetail: MovieDetailComponent,
    CreateMovie: CreateMovieComponent,
    ...rest
  } = jest.requireActual('components/templates')

  const MovieList = (props: typeof MovieListComponent) => {
    mockMovieList(props)
    return <MovieListComponent {...props} />
  }

  const MovieDetail = (props: typeof MovieDetailComponent) => {
    mockMovieDetail(props)
    return <MovieDetailComponent {...props} />
  }

  const CreateMovie = (props: typeof CreateMovieComponent) => {
    mockCreateMovie(props)
    return <CreateMovieComponent {...props} />
  }

  return {
    MovieList,
    MovieDetail,
    CreateMovie,
    ...rest,
  }
})

export { mockMovieList, mockMovieDetail, mockCreateMovie }
