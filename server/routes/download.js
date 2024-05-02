const express = require('express');
const path = require('path');
const { createZipFile } = require('../controllers/downloadController');

const router = express.Router();

/* GET result file to download. */
router.get('/:resultFile', async (req, res) => {
  const fileName = req.params.resultFile.replace('.html', '');
  const files = [`${fileName}.html`, `${fileName}.json`];
  // res.sendFile(path.join(__dirname, `../results/${files[0]}`));
  const zipFile = await createZipFile(files);
  // res.sendFile(path.join(__dirname, `../results/${files[1]}`));
  // res.sendFile(path.join(__dirname, '../results/test.txt'));
  // res.set('Content-Type', 'application/zip');
  res.sendFile(path.join(__dirname, `../results/${zipFile}`));
  // res.send(zipFile);
  // res.set('Content-Type', 'application/zip');
  // res.set('Content-Disposition', 'attachment; filename=myfiles.zip');
  // res.set('Content-Length', zipBuffer.length);
  // res.end(zipBuffer);
});

module.exports = router;
