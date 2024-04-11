import React from 'react';
import PropTypes from 'prop-types';
import {
  CloseOutlined,
  FileDownloadOutlined,
} from '@mui/icons-material';
import {
  Button, IconButton, CircularProgress, Stack, Box,
} from '@mui/material';
import State from '../constants';

function ButtonStack({
  fileId, fileState, buttonSize, handleRemoveFile, handleDownload,
}) {
  let dynamicControls;
  switch (fileState) {
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
      <IconButton onClick={() => handleRemoveFile(fileId)}>
        <CloseOutlined sx={{ height: buttonSize, width: buttonSize }} />
      </IconButton>
    </Stack>
  );
}

ButtonStack.propTypes = {
  fileId: PropTypes.string.isRequired,
  fileState: PropTypes.string.isRequired,
  buttonSize: PropTypes.string,
  handleRemoveFile: PropTypes.func.isRequired,
  handleDownload: PropTypes.func.isRequired,
};

ButtonStack.defaultProps = {
  buttonSize: '2rem',
};

export default ButtonStack;
