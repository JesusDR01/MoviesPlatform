import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, Grid, Rating, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useTranslation } from 'next-i18next'

const Container = styled(Grid)`
  background-color: #fff;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 30px #d9d9d9, -10px -10px 30px #fff;
`

interface Props {
  readonly id: string
  readonly name: string
  readonly director: string
  readonly year: number
  readonly meanRating: number
  handleOpenDeleteModal: (id: string) => void
  handleOpenUpdateModal: (id: string) => void
}

export const MovieItem = ({
  id,
  name,
  director,
  year,
  meanRating,
  handleOpenDeleteModal,
  handleOpenUpdateModal,
}: Props) => {
  const { t } = useTranslation()
  return (
    <Container item xs={12}>
      <Typography>{t('form.values.name')}: {name}</Typography>
      <Typography>Director: {director}</Typography>
      <Typography>{t('form.values.year')}: {year}</Typography>
      <Rating name="simple-controlled" readOnly value={meanRating} />
      <Box sx={{ flexGrow: 1 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleOpenDeleteModal(id)}
          sx={{marginRight: '10px'}}
        >
          <DeleteIcon />
        </Button>
        <Button variant="contained" onClick={() => handleOpenUpdateModal(id)}>
          <EditIcon />
        </Button>
      </Box>
    </Container>
  )
}
