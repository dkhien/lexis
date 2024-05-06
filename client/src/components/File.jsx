import React from 'react';
import { Box, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import ButtonStack from './ButtonStack';
import FileInfo from './FileInfo';
import convertSize from '../utils/unitConverter';

const buttonSize = '2rem';
const localStorageKeys = ['newTextColor', 'newLinkColor', 'newBackgroundColor', 'fontFamilyValue', 'headerFontSizeValue', 'textFontSizeValue'];

function File({ file, handleRemoveFile }) {
  const fileSize = convertSize(file.file.size);

  const handleDownload = async () => {
    // Get local storage style object
    const localStorageData = {};
    localStorageKeys.forEach((key) => {
      if (localStorage.getItem(key)) {
        localStorageData[key] = localStorage.getItem(key);
      }
    });
    // TODO: Implement file download
    const downloadAPI = `${process.env.REACT_APP_SERVER_URL}/api/download/${file.resultFile}`;
    await axios({
      method: 'get',
      url: downloadAPI,
      params: { style: localStorageData },
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: 'application/pdf' }),
      );
      const link = document.createElement('a');
      link.href = url;
      const filename = `${file.resultFile}.pdf`;
      link.setAttribute(
        'download',
        filename,
      );
      // Append to html link element page
      document.body.appendChild(link);

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
            handleDownload={handleDownload}
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
    resultPath: PropTypes.string,
    resultFile: PropTypes.string,
  }).isRequired,
  handleRemoveFile: PropTypes.func.isRequired,
};

export default File;
