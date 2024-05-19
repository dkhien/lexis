import React from 'react';
import {
  Card, CardMedia, CardContent, Typography, Box,
  CardActionArea,
} from '@mui/material';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import useDocumentStore from '../../store/documentStore';
import { State, LexisDocumentType, Languages } from '../../constants';

function BookItem({
  name, image, author, content,
}) {
  const addDocument = useDocumentStore((state) => state.addDocument);
  const navigate = useNavigate();

  const addToDocuments = () => {
    addDocument({
      id: uuidv4(),
      state: State.DONE,
      type: LexisDocumentType.BOOK,
      file: null,
      language: Languages.English,
      name,
      content,
    });
    navigate('/');
  };

  return (
    <Card elevation={2} variant="standard">
      <CardContent>
        <Box marginBottom="0.5rem">
          <CardActionArea>
            <CardMedia
              component="img"
              height="250"
              image={image || 'https://freight.cargo.site/w/302/i/d4a357e3270e3df8063e74bf538cad4c1ee2c0591cd6f316f1a72d9baa16b375/cover-default--book.svg'}
              alt="Book Cover"
              sx={{
                borderRadius: '0.2rem',
                objectFit: 'cover',
                objectPosition: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
              onClick={addToDocuments}
            />
          </CardActionArea>
        </Box>
        <Typography
          variant="h7"
          fontWeight="500"
          component="div"
          whiteSpace="pre-wrap"
          overflow="hidden"
          textOverflow="ellipsis"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {author}
        </Typography>
      </CardContent>
    </Card>
  );
}

BookItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.instanceOf(Array).isRequired,
};

export default BookItem;
