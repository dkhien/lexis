import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import FileTypeIcon from '../common/FileTypeIcon';

function DocumentInfo({
  name, type, size, content,
}) {
  return (
    <Box display="flex" alignItems="center" gap={2} width="50%">
      <FileTypeIcon fileType={type} />
      <Typography
        width="70%"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        title={type === 'text/plain' ? content : name}
      >
        {name}
      </Typography>
      <Typography>{size}</Typography>
    </Box>
  );
}

DocumentInfo.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  content: PropTypes.string,
};

DocumentInfo.defaultProps = {
  content: '',
};

export default DocumentInfo;
