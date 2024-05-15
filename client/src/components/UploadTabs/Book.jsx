import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Card, CardContent, CardMedia, Typography, Box,
  Fab, CardActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

function Book({
  name, image, description, handleAddBook,
}) {
  return (
    <Card
      sx={{
        width: '100%',
        transition: '0.3s',
        boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
        borderRadius: '0.5rem',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 24px 80px -12.125px rgba(0,0,0,0.3)',
          cursor: 'pointer',
        },
      }}
    >
      <CardMedia
        component="img"
        style={{
          height: 'auto',
          aspectRatio: '5/6',
          objectFit: 'cover',
        }}
        image={image}
        alt={name}
      />
      <CardContent sx={{ textAlign: 'left', height: '5em' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {name}
        </Typography>
      </CardContent>
      <CardContent sx={{ textAlign: 'left', minHeight: 130 }}>
        <Typography variant="body2" color="text.secondary">
          {Object.entries(description).map(([key, value]) => (
            <React.Fragment key={uuidv4()}>
              <Box component="span" fontWeight="fontWeightBold">
                {key}
                :
              </Box>
              {' '}
              {value}
              <br />
            </React.Fragment>
          ))}
        </Typography>
      </CardContent>
      <CardActions>
        <Fab color="primary" aria-label="add" size="small" onClick={handleAddBook}>
          <AddIcon />
        </Fab>
      </CardActions>
    </Card>
  );
}

Book.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.instanceOf(Object).isRequired,
  handleAddBook: PropTypes.func.isRequired,
};

export default Book;
