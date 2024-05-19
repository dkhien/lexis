import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';
import UploadTabs from '../UploadTabs/UploadTabs';
/**
 * Renders a non-modal dialog to upload new document.
 */
export default function UploadDialog({ sx }) {
  return (
    <Card
      sx={{
        width: '100%', height: '650px', padding: '2rem', borderRadius: '1rem', ...sx,
      }}
      variant="outlined"
    >
      <Typography variant="h6" align="left" gutterBottom>
        Add a document
      </Typography>
      <UploadTabs />
    </Card>
  );
}

UploadDialog.propTypes = {
  sx: PropTypes.instanceOf(Object),
};

UploadDialog.defaultProps = {
  sx: {},
};
