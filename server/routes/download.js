const express = require('express');
const path = require('path');
const winstonLogger = require('../utils/logger');
const convertToPdf = require('../services/convertToPdf');

const router = express.Router();

/* GET result file to download. */
router.get('/:resultFile', async (req, res) => {
  const { style } = req.query;
  const file = req.params.resultFile;
  try {
    const result = await convertToPdf.addStyleAndConvertToPdf(file, style);
    res.sendFile(path.join(result));
  } catch (error) {
    winstonLogger.error(`Error adding style to HTML: ${error}`);
    res.status(500).send('Error adding style to HTML');
  }
  // res.sendFile(path.join(__dirname, `../results/${req.params.resultFile}`));
});

module.exports = router;
