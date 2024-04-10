import React from 'react';
import { Box, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonStack from './ButtonStack';
import FileInfo from './FileInfo';
import convertSize from '../utils/unitConverter';

const buttonSize = '2rem';

function File({ file, handleRemoveFile }) {
  const fileSize = convertSize(file.file.size);
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <FileInfo
          fileName={file.file.name}
          fileType={file.file.type}
          fileSize={fileSize}
          iconSize={buttonSize}
        />
        <Box display="flex" alignItems="center" gap={2}>
          <ButtonStack
            fileId={file.id}
            fileState={file.state}
            buttonSize={buttonSize}
            handleRemoveFile={handleRemoveFile}
          />
        </Box>
      </Box>
      <Divider sx={{ marginY: '1em' }} />
    </>
  );
}

File.propTypes = {
  file: PropTypes.shape({
    file: PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
  handleRemoveFile: PropTypes.func.isRequired,
};

export default File;
