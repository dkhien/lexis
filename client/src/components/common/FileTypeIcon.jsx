import React from 'react';
import {
  ImageOutlined, PictureAsPdfOutlined, TextFields,
  InsertDriveFileOutlined, LanguageOutlined, ChromeReaderModeOutlined,
} from '@mui/icons-material';
import {
  isImageFile, isPDFFile, isTextFile, isWebpageDoc, isTextDoc, isBookFile,
} from '../../utils/fileUtils';

function FileTypeIcon({ fileType, iconSize = '2rem' }) {
  let icon;
  if (isPDFFile(fileType)) {
    icon = <PictureAsPdfOutlined sx={{ width: iconSize, height: iconSize }} />;
  } else if (isTextFile(fileType) || isTextDoc(fileType)) {
    icon = <TextFields sx={{ width: iconSize, height: iconSize }} />;
  } else if (isImageFile(fileType)) {
    icon = <ImageOutlined sx={{ width: iconSize, height: iconSize }} />;
  } else if (isWebpageDoc(fileType)) {
    icon = <LanguageOutlined sx={{ width: iconSize, height: iconSize }} />;
  } else if (isBookFile(fileType)) {
    icon = <ChromeReaderModeOutlined sx={{ width: iconSize, height: iconSize }} />;
  } else {
    icon = <InsertDriveFileOutlined sx={{ width: iconSize, height: iconSize }} />;
  }
  return icon;
}

export default FileTypeIcon;
