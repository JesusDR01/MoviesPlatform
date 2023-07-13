import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

import type { AxiosError } from 'axios'
import type { Movie, NoMovieID } from 'types'
import { INITIAL_PAGE, PER_PAGE_DEFAULT } from './constants'

const MOVIES_URL = `${process.env.NEXT_PUBLIC_API_SERVER}/api/movies`

const getMovies = async ({
  pageParam = INITIAL_PAGE,
  filters
}:{
  pageParam?: number
  filters?: Partial<NoMovieID>
}): Promise<{
  current_page: number
  movies: ReadonlyArray<Movie>
  total_pages: number
}> => {
  const response = await axios.post(`${MOVIES_URL}/search?page=${pageParam}&per_page=${PER_PAGE_DEFAULT}`, filters)

  return  response.data
}

export const useGetMovies = (params?:{filters?:Partial<NoMovieID>}) => {
  return useInfiniteQuery(['GetMovies', params?.filters], ({pageParam}) => getMovies({filters: params?.filters, pageParam: pageParam}), {
    getPreviousPageParam: (firstPage) => firstPage.current_page - 1,
    getNextPageParam: (lastPage) => {
      return lastPage.current_page + 1 > lastPage.total_pages
        ? undefined
        : lastPage.current_page + 1
    },
  })
}

interface GetMovieParams {
  readonly id: string | undefined
}

const getMovie = async ({
  movieID,
}: {
  readonly movieID: number
}): Promise<Movie> => {
  const response = await axios.get(`${MOVIES_URL}/${movieID}`)

  return response.data
}

export const useGetMovie = ({ id }: GetMovieParams) => {
  const movieID =
    typeof id === 'string' && !isNaN(Number.parseInt(id))
      ? Number.parseInt(id)
      : undefined

  return useQuery(
    ['GetMovie', id],
    () => getMovie({ movieID: movieID as number }),
    {
      refetchOnWindowFocus: false,
      enabled: movieID !== undefined,
    },
  )
}

export interface CreateMovieParams {
  readonly name: string
  readonly director: string
  readonly meanRating: number
  readonly year: number
}

const createMovie = async ({
  name,
  director,
  meanRating,
  year,
}: CreateMovieParams): Promise<Movie> => {
  try{
    const response = await axios.post(`${MOVIES_URL}`, {
      name,
      director,
      mean_rating: meanRating,
      year,
    })
  
    return response.data
  }catch(err){
    throw (err as any).response.data.msg 
  }

}

interface CreateMovieCallback {
  readonly onSuccess?: (data: Movie) => void
  readonly onError?: (error: string) => void
}

export const useCreateMovie = ({ onSuccess, onError }: CreateMovieCallback) => {
  return useMutation(
    async ({ name, director, meanRating, year }: CreateMovieParams) =>
      createMovie({ name, director, meanRating, year }),
    {
      onSuccess,
      onError,
    },
  )
}

export interface DeleteMovieParams {
  readonly movieID: string
}

const deleteMovie = async ({ movieID }: DeleteMovieParams): Promise<Movie> => {
  const response = await axios.delete(`${MOVIES_URL}/${movieID}`)

  return response.data
}

interface DeleteMovieCallback {
  readonly onSuccess?: (data: Movie) => void
  readonly onError?: (error: AxiosError) => void
}

export const useDeleteMovie = ({ onSuccess, onError }: DeleteMovieCallback) => {
  return useMutation(
    async ({ movieID }: DeleteMovieParams) => deleteMovie({ movieID }),
    {
      onSuccess,
      onError,
    },
  )
}

export interface UpdateMovieParams {
  readonly movieID: string
  readonly name: string
  readonly director: string
  readonly meanRating: number
  readonly year: number
}

const updateMovie = async ({
  movieID,
  name,
  director,
  meanRating,
  year,
}: UpdateMovieParams): Promise<Movie> => {
  
  try{
    const response = await axios.put(`${MOVIES_URL}/${movieID}`, {
      name,
      director,
      year,
      mean_rating: meanRating,
    })
  return response.data

  }catch(err){
    throw (err as any).response.data.msg 
  }


}

interface UpdateMovieCallback {
  readonly onSuccess?: (data: Movie) => void
  readonly onError?: (error: string) => void
}

export const useUpdateMovie = ({ onSuccess, onError }: UpdateMovieCallback) => {
  return useMutation(
    async ({ movieID, name, director, meanRating, year }: UpdateMovieParams) =>
      updateMovie({ movieID, name, director, meanRating, year }),
    {
      onSuccess,
      onError,
    },
  )
}
