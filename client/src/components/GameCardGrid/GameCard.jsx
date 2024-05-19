import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function GameCard({
  name, description, image, path,
}) {
  const navigate = useNavigate();
  return (
    <Card
      raised
      sx={{
        maxWidth: 500,
        margin: '0 auto',
        padding: '0.1em',
        borderRadius: '1em',
      }}
    >
      <CardActionArea onClick={() => navigate(path)}>
        <CardMedia
          component="img"
          height="500"
          width="500"
          image={image}
          alt="green iguana"
          sx={{ padding: '1em 1em 0 1em', objectFit: 'cover', borderRadius: '3em' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

GameCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
