import React from 'react';
import { Box, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonStack from './ButtonStack';
import DocumentInfo from './DocumentInfo';
import { LexisDocumentType } from '../../constants';
import convertSize from '../../utils/unitConverter';
import handleDownloadUtil from '../../utils/downloadUtils';

function DocumentListItem({ document }) {
  const fileSize = document.type === LexisDocumentType.FILE ? convertSize(document.file.size) : '';
  const handleDownload = async () => {
    await handleDownloadUtil(document);
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
          name={document.name}
          type={document.type === LexisDocumentType.FILE ? document.file.type : document.type}
          content={document.content}
          size={fileSize}
        />
        <Box display="flex" alignItems="center" gap={2}>
          <ButtonStack
            documentId={document.id}
            documentState={document.state}
            handleDownload={handleDownload}
            documentType={document.type}
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
    }),
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    content: PropTypes.arrayOf(PropTypes.string),
    resultPath: PropTypes.string,
    resultFile: PropTypes.string,
  }).isRequired,
};

export default DocumentListItem;
