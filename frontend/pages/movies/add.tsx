import { useState } from 'react'

import { Alert, Snackbar } from '@mui/material'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { useCreateMovie } from 'api/movies'
import { CreateMovie } from 'components/templates'

const CreateMovieScreen = () => {
  const [openError, setOpenError] = useState(false)
  const router = useRouter()

  const { mutate: createMovie, isLoading: isCreating, error } = useCreateMovie({
    onSuccess: () => {
      router.push('/')
    },
    onError: () => {
      setOpenError(true)
    },
  })

  const handleCreate = (
    name: string,
    director: string,
    meanRating: number,
    year: number,
  ) => {
    createMovie({
      name: name,
      director: director,
      meanRating,
      year,
    })
  }
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }
  }
  return (
    <>
      <CreateMovie isCreating={isCreating} onCreateMovie={handleCreate} />
      <Snackbar open={openError}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    revalidate: 10,
    props: {
      ...(await serverSideTranslations(locale || '', ['pages', 'common'])),
    },
  }
}

export default CreateMovieScreen
