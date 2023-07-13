import { QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { queryClient } from 'utils/test'

import mockMovieData from './mockData/movie.json'

import type { CreateMovieParams } from './index'
import type {
  UseMutationResult,
} from '@tanstack/react-query'
import type { Movie } from 'types'

import { useCreateMovie } from './index'

const mockAxios = new MockAdapter(axios)

describe('[API] Movies', () => {
 

  describe('useCreateMovie', () => {
    it('success', async () => {
      mockAxios.onPost('/movies').reply(200, mockMovieData)
      const wrapper = ({ children }: { children: JSX.Element }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )

      let result: {
        current: UseMutationResult<Movie, string, CreateMovieParams, unknown>
      }

      await act(async () => {
        result = renderHook(
          () =>
            useCreateMovie({
              onError: () => {},
            }),
          { wrapper },
        ).result
      })

      await act(async () => {
        result.current.mutate({
          name: 'test name',
          director: 'test director',
          meanRating: 1,
          year: 2023,
        })
      })

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(false)
      })

    })

    it('fail', async () => {
      mockAxios.onPost('/movies').reply(400)
      const wrapper = ({ children }: { children: JSX.Element }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
      let data
      let result: {
        current: UseMutationResult<Movie, string, CreateMovieParams, unknown>
      }
      await act(async () => {
        result = renderHook(
          () =>
            useCreateMovie({
              onSuccess: (apiData) => (data = apiData),
            }),
          { wrapper },
        ).result
      })

      await act(async () => {
        result.current.mutate({
          name: 'test name',
          director: 'test director',
          meanRating: 1,
          year: 2023,
        })
      })

      await waitFor(() => {
        expect(result.current.isError).toBe(true)
      })

      expect(data).toEqual(undefined)
    })
  })
})
