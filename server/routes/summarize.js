const express = require('express');
const { summarizeText } = require('../services/summarize');

const router = express.Router();

// POST /summarize
// Endpoint to receive text and generate a summary
// Note: Include the input text in request.body.text
router.post('/', async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || text.length === 0) {
      const error = new Error('No text provided');
      error.httpStatusCode = 400;
      return next(error);
    }

    const result = await summarizeText(text);
    res.send(result);
  } catch (error) {
    next(error);
  }

  return null;
});

module.exports = router;
