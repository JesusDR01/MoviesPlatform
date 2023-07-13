import React, { useEffect, useState } from 'react'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Rating,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { useTranslation } from 'next-i18next'

import type { NoMovieID } from 'types'

const Container = styled(Grid)`
  background-color: #fff;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 30px #d9d9d9, -10px -10px 30px #fff;
`

export const MovieForm = ({
  isLoading,
  handleAction,
  handleBack,
  actionType,
  defaultValues,
  performValidations = true,
  children,
}: {
  isLoading?: boolean
  handleAction: ({
    name,
    director,
    mean_rating,
    year,
  }?: Partial<NoMovieID>) => void
  handleBack?: () => void
  actionType?: 'Create' | 'Update' | 'Search'
  defaultValues?:
    | NoMovieID
    | { name: string; director: string; mean_rating: number; year?: number }
  performValidations?: boolean
  children?: React.ReactNode
}) => {
  const [name, setName] = useState(defaultValues?.name || '')
  const [nameError, setNameError] = useState('')
  const [director, setDirector] = useState(defaultValues?.director || '')
  const [directorError, setDirectorError] = useState('')
  const [meanRating, setMeanRating] = useState<number | undefined>(
    defaultValues?.mean_rating || 0,
  )
  const [meanRatingError, setMeanRatingError] = useState('')
  const [year, setYear] = useState<number | undefined>(defaultValues?.year)
  const [yearError, setYearError] = useState('')

  const handleChangeName = (value: string) => {
    if (nameError !== '') setNameError('')
    setName(value)
  }

  const handleChangeDirector = (value: string) => {
    if (directorError !== '') setDirectorError('')
    setDirector(value)
  }

  const handleChangeYear = (value: number) => {
    if (yearError !== '') setYearError('')
    setYear(value)
  }

  const handleChangeMeanRating = (value: number | undefined) => {
    if (meanRatingError !== '') setMeanRatingError('')
    setMeanRating(value)
  }

  const { t } = useTranslation()

  useEffect(() => {
    if (defaultValues) {
      setName(defaultValues.name)
      setDirector(defaultValues.director)
      setYear(defaultValues.year)
      setMeanRating(defaultValues.mean_rating)
    }
  }, [defaultValues])

  return (
    <>
      <Toolbar />
      <Grid container>
        <Container item xs={12} onClick={() => {}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {handleBack && (
              <Button
                size="small"
                color="inherit"
                startIcon={<ArrowBackIosNewIcon />}
                style={{ marginBottom: 16 }}
                onClick={handleBack}
              >
                {t('movies')}
              </Button>
            )}
          </Box>
          <Box>
            <TextField
              size="small"
              fullWidth
              label={t('form.values.name')}
              value={name}
              error={Boolean(nameError)}
              helperText={nameError}
              sx={{
                marginBottom: Boolean(nameError) ? 0 : '24px',
              }}
              onChange={(e) => handleChangeName(e.target.value)}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="Director"
              InputProps={{
                inputProps: { minLength: 20 },
              }}
              value={director}
              error={Boolean(directorError)}
              helperText={directorError}
              sx={{
                marginBottom: Boolean(directorError) ? 0 : '24px',
              }}
              onChange={(e) => handleChangeDirector(e.target.value)}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              type="number"
              label={t('form.values.year')}
              value={year}
              error={Boolean(yearError)}
              InputProps={{
                inputProps: { min: 0 },
              }}
              helperText={yearError}
              sx={{
                marginBottom: Boolean(yearError) ? 0 : '24px',
              }}
              onChange={(e) => handleChangeYear(Number(e.target.value))}
            />
          </Box>
          <Box>
            <Typography sx={{ marginRight: '10px' }}>
              {t('form.values.rating')}:
            </Typography>
            <Rating
              name="simple-controlled"
              value={meanRating}
              onChange={(e, newValue) => {
                // eslint-disable-next-line no-null/no-null
                if (newValue !== null) {
                  handleChangeMeanRating(newValue)
                }
              }}
            />
            <Typography
              sx={{ marginLeft: '16px', color: 'red', fontSize: '.75rem' }}
            >
              {meanRatingError}
            </Typography>
          </Box>
          <Button
            size="small"
            variant="contained"
            style={{ marginBottom: 16 }}
            disabled={isLoading}
            onClick={() => {
              let handleActionObj = undefined
              if (performValidations) {
                if (name === '') {
                  setNameError(t('form.errors.name') || '')
                }
                if (director === '') {
                  setDirectorError(t('form.errors.director') || '')
                }
                if (!meanRating) {
                  setMeanRatingError(t('form.errors.rating') || '')
                }
                if (year === undefined || year < 0) {
                  setYearError(t('form.errors.year') || '')
                }
                if (
                  name === '' ||
                  director === '' ||
                  !meanRating ||
                  year === undefined ||
                  year < 0
                ) {
                  return
                }
                setMeanRatingError('')
              }
              handleActionObj = {
                name,
                director,
                mean_rating: meanRating,
                year,
              }

              handleAction(handleActionObj)
            }}
          >
            {isLoading ? (
              <CircularProgress size="1rem" />
            ) : (
              actionType || t('form.actions.create')
            )}
          </Button>
          {children}
        </Container>
      </Grid>
    </>
  )
}
