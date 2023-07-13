import React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Box } from '@mui/material'
import Fade from '@mui/material/Fade'

import { StyledGenericModal } from './GenericModal.styled'

export const GenericModal = ({
  openState,
  children,
}: {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  children: React.ReactNode
}) => {
  const [open, setOpen] = openState
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <StyledGenericModal
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose()
        }
      }}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box id="modal-content">
          <CloseIcon
            id="close-icon"
            onClick={handleClose}
            sx={{ cursor: 'pointer' }}
          />
          {children}
        </Box>
      </Fade>
    </StyledGenericModal>
  )
}
