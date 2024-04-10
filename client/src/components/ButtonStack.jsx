import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  CloseOutlined,
  FileDownloadOutlined,
  RemoveRedEyeOutlined,
} from '@mui/icons-material';
import {
  Button, IconButton, LinearProgress, Stack, Box,
} from '@mui/material';
import State from '../constants';

function ButtonStack({
  fileId, fileState, buttonSize, handleRemoveFile,
}) {
  let dynamicControls;
  switch (fileState) {
    case State.PROCESSING:
      {
        const [progress, setProgress] = useState(0);

        useEffect(() => {
          const timer = setInterval(() => {
            setProgress((oldProgress) => {
              if (oldProgress === 100) {
                return 0;
              }
              const diff = Math.random() * 10;
              return Math.min(oldProgress + diff, 100);
            });
          }, 500);

          return () => {
            clearInterval(timer);
          };
        }, []);
        dynamicControls = (
          <Box display="flex" alignItems="center">
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: '0.5rem',
                width: '18.75rem',
                display: 'grid',
                alignItems: 'center',
                marginX: '1em',
                borderRadius: '5px',
              }}
            />
          </Box>
        );
      }
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
              padding: '1.5em',
            }}
          >
            <RemoveRedEyeOutlined sx={{ fontSize: buttonSize }} />
          </Button>
          <Button
            variant="outlined"
            sx={{
              height: buttonSize,
              width: buttonSize,
              minWidth: 0,
              padding: '1.5em',
            }}
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
};

ButtonStack.defaultProps = {
  buttonSize: '2rem',
};

export default ButtonStack;
