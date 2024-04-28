const express = require('express');
const { summarizeTxt } = require('../services/summarize');

const router = express.Router();

// Receive text and process
router.post('/', async (req, res, next) => {
  try {
    const { text } = req;
    if (!text || text.length === 0) {
      const error = new Error('No text provided');
      error.httpStatusCode = 400;
      return next(error);
    }

    const result = await summarizeTxt.summarizeText(text);

    res.send(result);
  } catch (error) {
    next(error);
  }

  return null;
});
