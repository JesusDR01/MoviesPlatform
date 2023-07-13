import React from 'react'

import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { StyledGenericDeleteModal } from './GenericDeleteModal.styled'

export const GenericDeleteModal = ({
  handleAction,
  handleCloseModal,
  warningMessage,
  action,
}: {
  handleAction: () => void
  handleCloseModal: () => void
  warningMessage: string
  action: string
}) => {
  const { t } = useTranslation()
  return (
    <StyledGenericDeleteModal>
      <Typography component="h2">{warningMessage}</Typography>
      <Box id="actions">
        <Button variant="contained" color="error" onClick={handleAction}>
          {action}
        </Button>
        <Button variant="contained" onClick={handleCloseModal}>
          {t('form.actions.cancel')}
        </Button>
      </Box>
    </StyledGenericDeleteModal>
  )
}
