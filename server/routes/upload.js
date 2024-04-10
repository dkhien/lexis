const express = require('express');
const upload = require('../middlewares/multer');

const router = express.Router();

// Upload files to server
router.post('/', upload.array('files'), (req, res, next) => {
  const { files } = req;
  if (!files || files.length === 0) {
    const error = new Error('Please choose files');
    error.httpStatusCode = 400;
    return next(error);
  }
  const filesWithId = files.map((file) => {
    const fileWithId = {
      id: file.filename.slice(0, 36),
      file,
    };
    return fileWithId;
  });

  res.send(filesWithId);
  return null;
});

module.exports = router;
