import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import mockMoviesData from 'api/movies/mockData/movies.json'
import { mockMovieList, queryClient } from 'utils/test'

import MovieListPage from '../pages/index'

import type { Movie } from 'types'

let mockResponse = {
  data: [] as readonly Movie[],
  isLoading: true,
}
jest.mock('api/movies', () => ({
  useGetMovies: () => mockResponse,
  useUpdateMovie: () => ({}),
  useDeleteMovie: () => ({}),
}))

describe('<MoviesListPage />', () => {
  it('rendered well with data', () => {
    mockResponse = { data: mockMoviesData, isLoading: false }

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <MovieListPage />
      </QueryClientProvider>,
    )

    expect(mockMovieList.mock.calls.length).toBe(1)

    expect(container).toMatchSnapshot()
  })
})
