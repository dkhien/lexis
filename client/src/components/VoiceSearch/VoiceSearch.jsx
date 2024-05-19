import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
  IconButton, Box,
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import PropTypes from 'prop-types';

function VoiceSearch({ setSearchQuery }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleStopListening = () => {
    setSearchQuery(transcript);
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  useEffect(() => {
    setSearchQuery(transcript);
  }, [listening, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <ReportProblemOutlinedIcon color="error" />;
  }

  return (
    <Box>
      <IconButton onClick={listening ? handleStopListening : SpeechRecognition.startListening} color={listening ? 'error' : 'default'}>
        <MicIcon />
      </IconButton>
    </Box>
  );
}

VoiceSearch.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
};

export default VoiceSearch;
