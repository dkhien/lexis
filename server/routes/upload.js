const express = require('express');
const upload = require('../middlewares/multer');
const { processFiles, processTexts, processWebpages } = require('../controllers/uploadController');

const router = express.Router();

// Receive files and process
router.post('/', upload.array('files'), async (req, res, next) => {
  try {
    const { files } = req;
    const textDocs = JSON.parse(req.body['text-docs']);
    const fileDocs = JSON.parse(req.body['file-docs']);
    const webpageDocs = JSON.parse(req.body['webpage-docs']);

    if ((!files || files.length === 0)
      && (!textDocs || textDocs.length === 0) && (!webpageDocs || webpageDocs.length === 0)) {
      const error = new Error('Empty documents. Please upload at least one file or enter some text.');
      error.httpStatusCode = 400;
      throw error;
    }
    const fileResults = await processFiles(files, fileDocs);
    const textResults = await processTexts(textDocs);
    const webpageResults = await processWebpages(webpageDocs);

    res.send({
      fileResults,
      textResults,
      webpageResults,
    });
  } catch (error) {
    next(error);
  }

  return null;
});

module.exports = router;
