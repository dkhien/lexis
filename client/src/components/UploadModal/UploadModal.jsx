/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import UploadTabs from '../UploadTabs/UploadTabs';

/**
 * Renders a pop-up modal dialog to upload new document.
 */
export default function UploadModal({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={{ paddingBottom: 0 }}>Add a document</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <UploadTabs closeModal={handleClose} />
      </DialogContent>
    </Dialog>
  );
}

UploadModal.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
