import React, { type Dispatch, type SetStateAction } from 'react'
import { MovieForm } from '../MovieForm'
import { type NoMovieID } from 'types'
import { Button } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/system'

const DeleteFiltersButton = styled(Button)`
  background-color: #d32f2f;
  :disabled {
    background-color: #d32f2f6e;
  }
  :hover{
    background-color: red;
  }
`

export const MovieFilter = ({
  filters,
  setFilters,
}: {
  filters: Partial<NoMovieID> | undefined
  setFilters: Dispatch<SetStateAction<Partial<NoMovieID> | undefined>>
}) => {
  const { t } = useTranslation()
  return (
    <>
      <MovieForm
        defaultValues={{
          name: filters?.name || '',
          director: filters?.director || '',
          mean_rating: filters?.mean_rating || 0,
          year: filters?.year,
        }}
        performValidations={false}
        handleAction={(values) => {
          if (values) {
            setFilters(values)
          }
        }}
        actionType="Search"
      >
        <DeleteFiltersButton
          size="small"
          variant="contained"
          style={{ marginBottom: 16, marginLeft: '20px', color: 'white' }}
          disabled={filters === undefined}
          onClick={() => {
            setFilters(undefined)
          }}
        >
          {t('form.actions.reset')}
        </DeleteFiltersButton>
      </MovieForm>
    </>
  )
}
