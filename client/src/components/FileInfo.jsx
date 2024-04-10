import React from 'react';
import PropTypes from 'prop-types';
import { PictureAsPdfOutlined, ImageOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

function FileInfo({
  fileName, fileType, fileSize, iconSize,
}) {
  return (
    <Box display="flex" alignItems="center" gap={2} width="50%">
      {fileType === 'application/pdf' ? (
        <PictureAsPdfOutlined sx={{ width: iconSize, height: iconSize }} />
      ) : (
        <ImageOutlined sx={{ width: iconSize, height: iconSize }} />
      )}
      <Typography width="70%" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" title={fileName}>
        {fileName}
      </Typography>
      <Typography>{fileSize}</Typography>
    </Box>
  );
}

FileInfo.propTypes = {
  fileName: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  fileSize: PropTypes.string.isRequired,
  iconSize: PropTypes.string.isRequired,
};

export default FileInfo;
