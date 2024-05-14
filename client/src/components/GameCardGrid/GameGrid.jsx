import * as React from 'react';
import Grid from '@mui/material/Grid';
import GameCard from './GameCard';
import RapTBT from '../../assets/images/games/RapTBT.jpg';
import balenci from '../../assets/images/games/balenci.jpg';
import RapObito from '../../assets/images/games/RapObito.jpg';

const GameData = [
  {
    name: 'Scrambled',
    description: 'hello',
    image: RapTBT,
  },
  {
    name: 'Fill In The Blanks',
    description: 'hello',
    image: balenci,
  },
  {
    name: 'Game 4',
    description: 'the lizard is a bigg ahh lizazrd',
    image: RapObito,
  },
  {
    name: 'Game 5',
    description: 'the lizard is a bigg ahh lizazrd',
    image: RapTBT,
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
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
