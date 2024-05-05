import React from 'react';
import PropTypes from 'prop-types';
import {
  CloseOutlined,
  FileDownloadOutlined,
} from '@mui/icons-material';
import {
  Button, IconButton, CircularProgress, Stack, Box,
} from '@mui/material';
import { State } from '../../constants';
import useDocumentStore from '../../store/documentStore';

function ButtonStack({
  documentId, documentState, buttonSize = '2rem', handleDownload,
}) {
  const removeDocument = useDocumentStore((state) => state.removeDocument);
  let dynamicControls;
  switch (documentState) {
    case State.PROCESSING:
      dynamicControls = (
        <Box display="flex" alignItems="center">
          <CircularProgress size="1.5rem" />
        </Box>
      );
      break;

    case State.DONE:
      dynamicControls = (
        <Stack
          spacing={2}
          direction="row"
          alignItems="flex-start"
          justifyContent="flex-end"
        >
          <Button
            variant="outlined"
            sx={{
              height: buttonSize,
              width: buttonSize,
              minWidth: 0,
              padding: '1.2rem',
            }}
            onClick={handleDownload}
          >
            <FileDownloadOutlined sx={{ fontSize: buttonSize }} />
          </Button>
        </Stack>
      );
      break;
    case State.READY:
    default:
  }

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
    >
      {dynamicControls}
      <IconButton onClick={() => removeDocument(documentId)}>
        <CloseOutlined sx={{ height: buttonSize, width: buttonSize }} />
      </IconButton>
    </Stack>
  );
}

ButtonStack.propTypes = {
  documentId: PropTypes.string.isRequired,
  documentState: PropTypes.string.isRequired,
  buttonSize: PropTypes.string,
  handleDownload: PropTypes.func.isRequired,
};

ButtonStack.defaultProps = {
  buttonSize: '2rem',
};

export default ButtonStack;
