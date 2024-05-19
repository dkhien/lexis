import * as React from 'react';
import Grid from '@mui/material/Grid';
import GameCard from './GameCard';
import scrambled from '../../assets/images/games/scrambled.jpeg';
import fillintheblanks from '../../assets/images/games/fillintheblanks.png';

const GameData = [
  {
    name: 'Scrambled',
    description: 'Rearrange the words to form the correct sentence.',
    image: scrambled,
    path: 'scrambled',
  },
  {
    name: 'Fill In The Blanks',
    description: 'Arrange words into the blanks to form a complete sentence.',
    image: fillintheblanks,
    path: 'fillintheblank',
  },
];

export default function GameGrid() {
  const [spacing] = React.useState(12);
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={12} padding="3rem">
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
          {GameData.map((game) => (
            <Grid key={game.name} item>
              <GameCard
                name={game.name}
                description={game.description}
                image={game.image}
                path={game.path}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
