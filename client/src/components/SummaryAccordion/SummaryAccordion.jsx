import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

export default function SummaryAccordion({ summaryText }) {
  return (
    <Box sx={{ marginBottom: '1rem' }}>
      <Accordion variant="outlined">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant="h6">Summary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            { summaryText }
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

SummaryAccordion.propTypes = {
  summaryText: PropTypes.string.isRequired,
};
