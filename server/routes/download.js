const express = require('express');
const path = require('path');
const { createZipFile } = require('../controllers/downloadController');

const router = express.Router();

/* GET result file to download. */
router.get('/:resultFile', async (req, res, next) => {
  try {
    const fileName = req.params.resultFile;
    const files = [`${fileName}.html`, `${fileName}.json`];
    const zipFile = await createZipFile(files);
    res.sendFile(path.join(__dirname, `../results/${zipFile}`));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
