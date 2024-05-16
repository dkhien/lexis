const express = require('express');
const path = require('path');
const convertToPdf = require('../services/convertToPdf');

const router = express.Router();

/* GET result file to download. */
router.get('/:resultFile', async (req, res, next) => {
  try {
    const { style } = req.query;
    const fileName = req.params.resultFile;
    await convertToPdf.addStyleAndConvertToPdf(fileName, style);
    const pdfFilePath = `${fileName}.pdf`;
    res.sendFile(path.join(__dirname, `../results/${pdfFilePath}`));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
