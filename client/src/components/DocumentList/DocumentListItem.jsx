import React from 'react';
import { Box, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import ButtonStack from './ButtonStack';
import DocumentInfo from './DocumentInfo';
import convertSize from '../../utils/unitConverter';

function DocumentListItem({ document }) {
  const fileSize = document.file.size && document.file.size > 0 ? convertSize(document.file.size) : '';

  const handleDownload = async () => {
    const downloadAPI = `${process.env.REACT_APP_SERVER_URL}/api/download/${document.resultFile}`;
    await axios({
      method: 'get',
      url: downloadAPI,
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(
        new Blob([response.data]),
        { type: 'application/zip' },
      );
      const link = window.document.createElement('a');
      link.href = url;
      const filename = `${document.resultFile}.zip`;
      link.setAttribute(
        'download',
        filename,
      );
      // Append to html link element page
      window.document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      URL.revokeObjectURL(url);
    });
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingRight="1em"
        width="100%"
      >
        <DocumentInfo
          name={document.file.name}
          type={document.file.type}
          content={document.content}
          size={fileSize}
        />
        <Box display="flex" alignItems="center" gap={2}>
          <ButtonStack
            documentId={document.id}
            documentState={document.state}
            handleDownload={handleDownload}
          />
        </Box>
      </Box>
      <Divider sx={{ marginY: '1em' }} />
    </>
  );
}

DocumentListItem.propTypes = {
  document: PropTypes.shape({
    file: PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    content: PropTypes.string,
    resultPath: PropTypes.string,
    resultFile: PropTypes.string,
  }).isRequired,
};

export default DocumentListItem;
