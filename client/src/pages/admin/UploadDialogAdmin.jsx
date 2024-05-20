import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Typography, Box, Card,
} from '@mui/material';
import axios from 'axios';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { v4 as uuidv4 } from 'uuid';
import convertSize from '../../utils/unitConverter';
import { Languages } from '../../constants';
/**
 * Renders a non-modal dialog to upload new document.
 */
export default function UploadDialogAdmin({ sx }) {
  const [isbn, setISBN] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [bookFile, setBookFile] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!isbn) newErrors.field1 = 'ISBN is required';
    if (!title) newErrors.field2 = 'Title is required';
    if (!author) newErrors.field3 = 'Author is required';
    if (!description) newErrors.field3 = 'Description is required';
    if (!bookFile) newErrors.field4 = 'Book file is required';
    return newErrors;
  };

  const handleUpload = async () => {
    try {
      const newErrors = validateForm();
      if (Object.keys(newErrors).length === 0) {
        setSnackbarMessage('Book uploaded successfully!');
        setShowToast(true);
        // Perform book uploading logic here
        const formData = new FormData();
        formData.append('file', bookFile);
        formData.append('file-book', JSON.stringify({
          id: uuidv4(),
          title,
          content: null,
          language: Languages.English,
          isbn,
          author,
          description,
        }));
        const uploadApi = `${process.env.REACT_APP_SERVER_URL}/api/admin/uploadBook`;
        await axios.post(uploadApi, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      // console.log(response);
      } else {
        setSnackbarMessage('Please fill in all required fields.');
        setShowToast(true);
      }
    } catch (error) {
      console.log(error);
      setSnackbarMessage('Failed to upload book!');
      setShowToast(true);
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleISBN = async () => {
    try {
      const response = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
      const { data } = response;
      const bookKey = `ISBN:${isbn}`;
      if (data[bookKey]) {
        const book = data[bookKey];
        setTitle(book.title);
        setAuthor(book.authors ? book.authors.map((authorr) => authorr.name).join(', ') : 'N/A');
        setDescription(book.notes || '');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(
    () => {
      if (isbn !== '') handleISBN();
      else {
        setTitle('');
        setAuthor('');
        setDescription('');
      }
    },
    [isbn],
  );

  return (
    <Card
      sx={{
        width: '100%', height: '650px', padding: '2rem', borderRadius: '1rem', ...sx,
      }}
      variant="outlined"
    >
      <Typography variant="h6" align="left" gutterBottom>
        Add a book
      </Typography>
      <Box display="flex" flexDirection="column">
        <TextField
          required
          label="ISBN"
          variant="filled"
          fullWidth
          value={isbn}
          onChange={(e) => setISBN(e.target.value)}
        />
        <TextField
          required
          label="Title"
          variant="filled"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          required
          label="Author"
          variant="filled"
          fullWidth
          margin="normal"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          required
          label="Description"
          variant="filled"
          fullWidth
          margin="normal"
          multiline
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Display uploaded file */}
        {bookFile && (
          <Box display="flex" gap={2} width="50%" alignItems="center">
            <PictureAsPdfOutlinedIcon sx={{ width: '2rem', height: '2rem' }} />
            <Typography
              width="70%"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              align="left"
            >
              {bookFile.name}
            </Typography>
            <Typography>
              {convertSize(bookFile.size)}

            </Typography>
          </Box>
        )}
        {/* Upload button */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            color="secondary"
            style={{
              marginRight: '10px', marginTop: '10px', height: '50px',
            }}
            startIcon={<CloudUploadIcon />}
          >
            Choose File
            <input
              type="file"
              hidden
              onChange={(e) => setBookFile(e.target.files[0])}
            />
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            style={{ marginTop: '10px', height: '50px' }}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </div>
        <Snackbar
          open={showToast}
          autoHideDuration={3000}
          onClose={handleCloseToast}
          message={snackbarMessage}
        />

      </Box>
    </Card>
  );
}

UploadDialogAdmin.propTypes = {
  sx: PropTypes.instanceOf(Object),
};

UploadDialogAdmin.defaultProps = {
  sx: {},
};
