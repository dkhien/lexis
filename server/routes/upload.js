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
  res.send(files);
  return null;
});

module.exports = router;
