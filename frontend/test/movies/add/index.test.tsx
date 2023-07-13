import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { AxiosError } from 'axios'
import { CreateMovie } from 'components/templates'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { getMockRouter, mockCreateMovie, queryClient } from 'utils/test'

import type { CreateMovieParams } from 'api/movies'
import type { NextRouter } from 'next/router'
import type { Movie } from 'types'


let mockAPISuccess = true
let mockIsLoading = false
let mockIsCalledOnSuccess = false
let mockIsCalledOnError = false

jest.mock('api/movies', () => ({
  useCreateMovie: ({
    onSuccess,
    onError,
  }: {
    readonly onSuccess?: (data: Movie) => void
    readonly onError?: (error: AxiosError) => void
  }) => ({
    mutate: ({ director, name, year, meanRating }: CreateMovieParams) => {
      if (mockAPISuccess) {
        if (onSuccess !== undefined) {
          mockIsCalledOnSuccess = true
          onSuccess({
            movieID: '1',
            name,
            mean_rating: meanRating,
            director,
            year,
          })
        }
      } else {
        if (onError !== undefined) {
          mockIsCalledOnError = true
          onError(new AxiosError('Error'))
        }
      }
    },
    isLoading: mockIsLoading,
  }),
}))

describe('<CreateMovie />', () => {
  let mockRouter: NextRouter

  beforeEach(() => {
    mockAPISuccess = true
    mockIsLoading = false
    mockIsCalledOnSuccess = false
    mockIsCalledOnError = false

    mockRouter = getMockRouter() as unknown as NextRouter
  })

  it('rendered well', () => {
    const { container } = render(
      <RouterContext.Provider value={mockRouter}>
        <QueryClientProvider client={queryClient}>
          <CreateMovie />
        </QueryClientProvider>
      </RouterContext.Provider>,
    )

    expect(mockCreateMovie.mock.calls.length).toBe(0)
 

    expect(container).toMatchSnapshot()
  })

  it('rendered well with isLoading', () => {
    mockIsLoading = true

    render(
      <RouterContext.Provider value={mockRouter}>
        <QueryClientProvider client={queryClient}>
          <CreateMovie />
        </QueryClientProvider>
      </RouterContext.Provider>,
    )

  })

  it('success to create movie', () => {
    mockAPISuccess = true
    const routerPush = jest.fn()
    mockRouter.push = routerPush

    render(
      <RouterContext.Provider value={mockRouter}>
        <QueryClientProvider client={queryClient}>
          <CreateMovie />
        </QueryClientProvider>
      </RouterContext.Provider>,
    )

    expect(mockIsCalledOnSuccess).toBe(false)
    expect(mockIsCalledOnError).toBe(false)
    expect(routerPush.mock.calls.length).toBe(0)



    expect(mockIsCalledOnSuccess).toBe(false)
    expect(mockIsCalledOnError).toBe(false)
  })

  it('fail to create movie', () => {
    mockAPISuccess = false

    render(
      <RouterContext.Provider value={mockRouter}>
        <QueryClientProvider client={queryClient}>
          <CreateMovie />
        </QueryClientProvider>
      </RouterContext.Provider>,
    )

    expect(mockIsCalledOnSuccess).toBe(false)
    expect(mockIsCalledOnError).toBe(false)

 

    expect(mockIsCalledOnSuccess).toBe(false)
    expect(mockIsCalledOnError).toBe(false)
  })
})
