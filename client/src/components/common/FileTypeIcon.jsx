import React from 'react';
import {
  ImageOutlined, PictureAsPdfOutlined, TextFields, InsertDriveFileOutlined,
} from '@mui/icons-material';

function FileTypeIcon({ fileType, iconSize = '2rem' }) {
  let icon;
  if (fileType === 'application/pdf') {
    icon = <PictureAsPdfOutlined sx={{ width: iconSize, height: iconSize }} />;
  } else if (fileType === 'text/plain') {
    icon = <TextFields sx={{ width: iconSize, height: iconSize }} />;
  } else if (fileType.startsWith('image/')) {
    icon = <ImageOutlined sx={{ width: iconSize, height: iconSize }} />;
  } else {
    icon = <InsertDriveFileOutlined sx={{ width: iconSize, height: iconSize }} />;
  }
  return icon;
}

export default FileTypeIcon;
