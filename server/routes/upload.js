const express = require('express');
const upload = require('../middlewares/multer');
const { processFiles, processTexts } = require('../controllers/uploadController');

const router = express.Router();

// Receive files and process
router.post('/', upload.array('files'), async (req, res, next) => {
  try {
    console.log(req.body);
    const { files } = req;
    const textDocs = JSON.parse(req.body['text-docs']);
    const fileDocs = JSON.parse(req.body['file-docs']);

    if ((!files || files.length === 0) && (!textDocs || textDocs.length === 0)) {
      const error = new Error('Empty documents. Please upload at least one file or enter some text.');
      error.httpStatusCode = 400;
      throw error;
    }
    const fileResults = await processFiles(files, fileDocs);
    const textResults = await processTexts(textDocs);

    res.send({
      fileResults,
      textResults,
    });
  } catch (error) {
    next(error);
  }

  return null;
});

module.exports = router;
