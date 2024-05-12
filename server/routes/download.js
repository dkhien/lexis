const express = require('express');
const path = require('path');
const { createZipFile } = require('../controllers/downloadController');
const convertToPdf = require('../services/convertToPdf');

const router = express.Router();

/* GET result file to download. */
router.get('/:resultFile', async (req, res, next) => {
  try {
    const { style } = req.query;
    const fileName = req.params.resultFile;
    await convertToPdf.addStyleAndConvertToPdf(fileName, style);
    const files = [`${fileName}.pdf`, `${fileName}.json`];
    const zipFile = await createZipFile(files);
    res.sendFile(path.join(__dirname, `../results/${zipFile}`));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
