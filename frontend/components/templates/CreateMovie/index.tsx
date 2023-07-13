import { Grid, Toolbar } from '@mui/material'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'

import { MovieForm } from 'components/organisms/MovieForm'
import type { NoMovieID } from 'types'

const Container = styled(Grid)`
  background-color: #fff;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 30px #d9d9d9, -10px -10px 30px #fff;
`

interface Props {
  readonly isCreating?: boolean
  readonly onCreateMovie?: (
    title: string,
    description: string,
    meanRating: number,
    year: number,
  ) => void
}

const CreateMovie = ({ isCreating, onCreateMovie }: Props) => {
  const router = useRouter()

  const handleBack = () => {
    router.push('/')
  }

  const handleCreate = (values: Partial<NoMovieID> | undefined) => {
    if (typeof onCreateMovie === 'function') {
      if (values && values.name && values.director && values.mean_rating && values.year) {
        onCreateMovie(
          values.name,
          values.director,
          values.mean_rating,
          values.year,
        )
      }
    }
  }

  return (
    <>
      <Toolbar />
      <Grid container>
        <Container item xs={12}>
          <MovieForm
            handleBack={handleBack}
            handleAction={handleCreate}
            isLoading={isCreating}
          />
        </Container>
      </Grid>
    </>
  )
}

export { CreateMovie }
