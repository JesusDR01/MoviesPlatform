import { forwardRef, Fragment, useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import { Typography } from '@mui/material'
import { Box, Grid } from '@mui/material'
import MuiAlert, { type AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useTranslation } from 'next-i18next'
import { createPortal } from 'react-dom'
import { useInView } from 'react-intersection-observer'

import { useDeleteMovie, useGetMovies, useUpdateMovie } from 'api/movies'
import { FloatingActionLink, PageLoading } from 'components/atoms'
import { GenericDeleteModal } from 'components/atoms/GenericDeleteModal'
import { GenericModal } from 'components/atoms/GenericModal'
import { MovieItem } from 'components/organisms'
import { Loader } from 'components/organisms/Loader'
import { MovieForm } from 'components/organisms/MovieForm'
import { MovieFilter } from 'components/organisms/MovieFilter'
import type { Movie, NoMovieID } from 'types'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const MovieList = () => {
  const [openError, setOpenError] = useState(false)
  const [openUpdateSuccess, setOpenSuccess] = useState(false)
  const [filters, setFilters] = useState<Partial<NoMovieID> | undefined>(
    undefined,
  )
  const [updatedMovieData, setUpdatedMovieData] = useState<Movie | undefined>(
    undefined,
  )

  const {
    status,
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetMovies({
    filters,
  })
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  const { t } = useTranslation()

  const { mutateAsync: deleteMovie, isLoading: isDeletingMovie } =
    useDeleteMovie({
      onSuccess: () => {
        refetch()
      },
      onError: () => {
        setOpenError(true)
      },
    })
  const deleteMovieModalState = useState(false)
  const [selectedMovie, setSelectedMovie] = useState('')
  const [openedDeleteModal, setOpenDeleteMovieModal] = deleteMovieModalState
  const handleOpenDeleteModal = (idMovie: string) => {
    setSelectedMovie(idMovie)
    setOpenDeleteMovieModal(true)
  }
  const handleDeleteMovie = async () => {
    await deleteMovie({ movieID: selectedMovie })
    setOpenDeleteMovieModal(false)
  }
  const handleCloseDeleteCoinModal = () => {
    setOpenDeleteMovieModal(false)
  }

  const {
    mutateAsync: updateMovie,
    isLoading: isUpdatingMovie,
    error,
    data: updatedMovie,
  } = useUpdateMovie({
    onSuccess: () => {
      refetch()
      handleClick()
    },
    onError: () => {
      setOpenError(true)
    },
  })
  
  useEffect(() => {
    setUpdatedMovieData(updatedMovie)
  }, [updatedMovie])

  const updateMovieModalState = useState(false)
  const [openedUpdateMovieModal, setOpenUpdateMovieModal] =
    updateMovieModalState
  const handleOpenUpdateModal = (idMovie: string) => {
    setUpdatedMovieData(undefined)
    setSelectedMovie(idMovie)
    setOpenUpdateMovieModal(true)
  }

  const handleClick = () => {
    setOpenSuccess(true)
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSuccess(false)
  }
  const handleUpdate = (values: Partial<NoMovieID> | undefined) => {
    if (typeof updateMovie === 'function') {
      try {
        if (
          values &&
          values.name &&
          values.director &&
          values.year &&
          values.mean_rating
        ) {
          updateMovie({
            movieID: selectedMovie,
            name: values.name,
            director: values.director,
            meanRating: values.mean_rating,
            year: values.year,
          })
        }
        setOpenError(false)
      } catch (err) {
        setOpenError(true)
        setOpenSuccess(false)
        setOpenUpdateMovieModal(false)
      }
    }
  }

  if (isLoading) {
    return <PageLoading />
  }
  return (
    <div>
      <MovieFilter filters={filters} setFilters={setFilters} />
      {status !== 'success' ? (
        <p>{t('loading')}</p>
      ) : (
        <>
          {data.pages.flatMap((page) => page.movies).length === 0 ? (
            <Typography sx={{ textAlign: 'center', marginTop: '150px' }}>
              {t('noResults')}
            </Typography>
          ) : (
            <Grid container>
              {data.pages.map((page) => (
                <Fragment key={page.current_page}>
                  {page.movies.map((movie) => (
                    <MovieItem
                      key={movie.movieID}
                      id={movie.movieID}
                      name={movie.name}
                      director={movie.director}
                      year={movie.year}
                      meanRating={movie.mean_rating}
                      handleOpenDeleteModal={handleOpenDeleteModal}
                      handleOpenUpdateModal={handleOpenUpdateModal}
                    />
                  ))}
                </Fragment>
              ))}
              <FloatingActionLink link="/movies/add">
                <AddIcon />
              </FloatingActionLink>
            </Grid>
          )}

          {isFetchingNextPage && <Loader minHeight="45vh" />}

          {createPortal(
            openedDeleteModal && (
              <GenericModal openState={deleteMovieModalState}>
                <Box id="form-wrapper">
                  {isDeletingMovie ? (
                    <Loader minHeight="45vh" />
                  ) : (
                    <GenericDeleteModal
                      handleAction={handleDeleteMovie}
                      handleCloseModal={handleCloseDeleteCoinModal}
                      warningMessage={t('form.actions.deleteWarning')}
                      action={t('form.actions.delete')}
                    />
                  )}
                </Box>
              </GenericModal>
            ),
            document.body,
          )}

          {createPortal(
            openedUpdateMovieModal && (
              <GenericModal openState={updateMovieModalState}>
                <Box id="form-wrapper">
                  {isUpdatingMovie ? (
                    <Loader minHeight="45vh" />
                  ) : (
                    <MovieForm
                      handleAction={handleUpdate}
                      isLoading={isUpdatingMovie}
                      actionType={t('form.actions.update') as 'Update'}
                      defaultValues={
                        updatedMovieData
                          ? updatedMovieData
                          : data.pages
                              ?.find((page) =>
                                page.movies.find(
                                  (movie) => movie.movieID === selectedMovie,
                                ),
                              )
                              ?.movies.find(
                                (movie) => movie.movieID === selectedMovie,
                              )
                      }
                    />
                  )}
                </Box>
              </GenericModal>
            ),
            document.body,
          )}

          <Snackbar
            open={openUpdateSuccess}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%' }}
            >
              {t('form.actions.updateSuccess')}
            </Alert>
          </Snackbar>
          <Snackbar open={openError}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: '100%' }}
            >
              {error}
            </Alert>
          </Snackbar>
          <div ref={ref}></div>
        </>
      )}
    </div>
  )
}

export { MovieList }
