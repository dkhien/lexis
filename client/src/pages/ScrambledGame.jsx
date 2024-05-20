import React, { useState } from 'react';
import {
  Box, Button, Grid, Paper, Typography,
} from '@mui/material';
import Confetti from 'react-confetti';
import mockScrambledSentences from '../utils/mockData';
import VideoBackground from '../components/VideoBackground/VideoBackground';

function ScrambledGame() {
  const [gameState, setGameState] = useState({
    currentSentence: '',
    scrambledWords: [],
    orderedWords: [],
    level: 1,
    gameStarted: false,
    showResult: false,
  });

  const getNextSentence = () => {
    const { level } = gameState;
    const currentSentence = mockScrambledSentences[level];
    const scrambledWords = currentSentence.split(' ').sort(() => Math.random() - 0.5);
    const orderedWords = [];
    setGameState((prevState) => ({
      ...prevState,
      currentSentence,
      scrambledWords,
      orderedWords,
      showResult: false,
    }));
  };

  const handlePlay = () => {
    setGameState((prevState) => ({
      ...prevState,
      gameStarted: true,
    }));
    getNextSentence();
  };

  const handleChangeLevel = () => {
    setGameState((prevState) => ({
      ...prevState,
      level: (prevState.level + 1) % mockScrambledSentences.length,
    }));
    getNextSentence();
  };

  const {
    currentSentence, scrambledWords, orderedWords, level, gameStarted, showResult,
  } = gameState;

  const handleCheck = () => {
    if (!showResult && orderedWords.length === currentSentence.split(' ').length) {
      setGameState((prevState) => ({
        ...prevState,
        showResult: true,
      }));
    }
  };

  const handleWordClick = (word) => {
    if (showResult) return;
    setGameState((prevState) => ({
      ...prevState,
      orderedWords: [...prevState.orderedWords, word],
      scrambledWords: prevState.scrambledWords.filter((w) => w !== word),
    }));
  };

  const bringBackToQueue = (word) => {
    if (showResult) return;
    setGameState((prevState) => ({
      ...prevState,
      orderedWords: prevState.orderedWords.filter((w) => w !== word),
      scrambledWords: [...prevState.scrambledWords, word],
    }));
  };

  const isInRightPosition = (word) => orderedWords.indexOf(word) === currentSentence.split(' ').indexOf(word);

  const handleRestartLevel = () => {
    setGameState((prevState) => ({
      ...prevState,
      showResult: false,
    }));

    getNextSentence();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" fontWeight="600">
          Scrambled!
        </Typography>
        <Typography variant="body1" marginTop="1rem" marginBottom="1rem" align="center">
          Rearrange the words to form the correct sentence.
        </Typography>
        <VideoBackground />
      </Grid>

      {gameStarted && (
        <>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Level:
              {' '}
              {level}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                padding: '1rem', height: '6rem', display: 'flex', alignItems: 'center',
              }}
            >
              {orderedWords.map((word) => {
                let color = 'primary';
                if (showResult) {
                  color = isInRightPosition(word) ? 'success' : 'error';
                }
                return (
                  <Button
                    key={word}
                    variant="outlined"
                    onClick={() => bringBackToQueue(word)}
                    color={color}
                    sx={{ margin: '0.5rem' }}
                  >
                    {word}
                  </Button>
                );
              })}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                padding: '1rem', height: '6rem', display: 'flex', alignItems: 'center',
              }}
            >
              {scrambledWords.map((word) => (
                <Button
                  key={word}
                  variant="outlined"
                  onClick={() => handleWordClick(word)}
                  sx={{ margin: '0.5rem' }}
                >
                  {word}
                </Button>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {showResult ? (
              <>
                <Typography variant="h6" align="center" sx={{ color: currentSentence === orderedWords.join(' ') ? 'success' : 'error' }}>
                  {currentSentence === orderedWords.join(' ') ? 'Correct!' : 'Wrong!'}
                </Typography>
                {currentSentence === orderedWords.join(' ') ? (
                  <Box>
                    <Confetti />
                    <Button variant="contained" onClick={handleChangeLevel}>
                      Next
                    </Button>
                  </Box>
                ) : (
                  <Button variant="contained" onClick={handleRestartLevel}>
                    Restart
                  </Button>
                )}
              </>
            ) : (
              <Button
                variant="contained"
                onClick={handleCheck}
                disabled={!orderedWords.length === currentSentence.split(' ').length}
              >
                Check
              </Button>
            )}
          </Grid>
        </>
      )}
      {!gameStarted && (
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" size="large" onClick={handlePlay}>
            Play
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default ScrambledGame;
