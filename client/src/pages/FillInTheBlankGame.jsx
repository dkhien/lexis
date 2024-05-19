import React, { useState } from 'react';
import {
  Grid, Typography, Paper, Button,
} from '@mui/material';
import mockFITBSentences from '../utils/FITBMockData';

function FillInTheBlankGame() {
  const [gameState, setGameState] = useState({
    blankIndexes: [],
    currentSentence: '',
    sentenceWords: [],
    FITBWords: [],
    filledBlanks: [],
    level: 1,
    gameStarted: false,
    showResult: false,
  });
  const [selectedBlank, setSelectedBlank] = useState();

  const getBlankIndexes = (sentenceWordsLength, numWordsToPick) => {
    const indexes = [];
    while (indexes.length < numWordsToPick) {
      const randomIndex = Math.floor(Math.random() * sentenceWordsLength);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  };

  const getNextSentence = () => {
    const { level } = gameState;
    const currentSentence = mockFITBSentences[level];
    const sentenceWords = currentSentence.split(' ');
    const blankIndexes = getBlankIndexes(sentenceWords.length, 4);
    const FITBWords = blankIndexes.map((index) => sentenceWords[index]);
    setGameState((prevState) => ({
      ...prevState,
      currentSentence,
      sentenceWords,
      blankIndexes,
      filledBlanks: sentenceWords.map((word) => (FITBWords.includes(word) ? '_' : word)),
      FITBWords,
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
      level: (prevState.level + 1) % mockFITBSentences.length,
    }));
    getNextSentence();
  };

  const handleCheck = () => {
    const { showResult, FITBWords } = gameState;
    if (!showResult && FITBWords.length === 0) {
      setGameState((prevState) => ({
        ...prevState,
        showResult: true,
      }));
    }
  };

  const handleWordClick = (word) => {
    const { showResult } = gameState;
    if (showResult || selectedBlank === undefined || gameState.filledBlanks[selectedBlank] !== '_') return;
    setGameState((prevState) => ({
      ...prevState,
      filledBlanks: prevState.filledBlanks.map((w, index) => (index === Number(selectedBlank)
        ? word : w)),
      FITBWords: prevState.FITBWords.filter((w) => w !== word),
    }));
  };

  const bringBackToQueue = (word) => {
    const { showResult } = gameState;
    if (showResult) return;
    setGameState((prevState) => ({
      ...prevState,
      filledBlanks: prevState.filledBlanks.map((w) => (w === word ? '_' : w)),
      FITBWords: [...prevState.FITBWords, word],
    }));
  };

  const isInRightPosition = (word, index) => gameState.sentenceWords[index] === word;

  const handleRestartLevel = () => {
    setGameState((prevState) => ({
      ...prevState,
      showResult: false,
    }));
    getNextSentence();
  };

  const {
    currentSentence, FITBWords, filledBlanks, level, gameStarted, showResult,
  } = gameState;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" fontWeight="600">
          Fill in the blank!
        </Typography>
        <Typography variant="body1" marginTop="1rem" marginBottom="1rem" align="center">
          Arrange words into the blanks to form a complete sentence.
        </Typography>
      </Grid>
      {gameStarted && (
        <>
          <Grid item xs="auto">
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
                padding: '1rem',
                height: '6rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {gameState.filledBlanks.map((word, index) => {
                if (gameState.filledBlanks[index] === '_' && gameState.blankIndexes.includes(index)) {
                  return (
                    <Button
                      key={`blank-${word}-${index + 1}`}
                      variant="outlined"
                      id={index}
                      color={index === Number(selectedBlank) ? 'secondary' : 'primary'}
                      onClick={(e) => setSelectedBlank(e.target.id)}
                      sx={{ margin: '0.5rem' }}
                    >
                      ‎ ‎ ‎ ‎
                      ‎ ‎ ‎ ‎
                    </Button>
                  );
                }
                if (gameState.filledBlanks[index] !== '_' && gameState.blankIndexes.includes(index)) {
                  let color = 'primary';
                  if (showResult) {
                    color = isInRightPosition(word, index) ? 'success' : 'error';
                  }
                  return (
                    <Button
                      key={`filled-${word}-${index + 1}`}
                      variant="outlined"
                      onClick={() => bringBackToQueue(word)}
                      color={color}
                      sx={{ margin: '0.5rem' }}
                    >
                      {word}
                    </Button>
                  );
                }
                return <Typography sx={{ margin: '0.5rem' }} key={`word-${word}-${index + 1}`}>{`${word}`}</Typography>;
              })}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                padding: '1rem',
                height: '6rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {FITBWords.map((word) => (
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
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ color: currentSentence === filledBlanks.join(' ') ? 'success' : 'error' }}
                >
                  {currentSentence === filledBlanks.join(' ') ? 'Correct!' : 'Wrong!'}
                </Typography>
                {currentSentence === filledBlanks.join(' ') ? (
                  <Button variant="contained" onClick={handleChangeLevel}>
                    Next
                  </Button>
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
                disabled={!FITBWords > 0}
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

export default FillInTheBlankGame;
