const express = require('express');
const upload = require('../middlewares/multer');
const { process } = require('../controllers/uploadController');

const router = express.Router();

// Receive files and process
router.post('/', upload.array('files'), async (req, res, next) => {
  try {
    const { files } = req;
    if (!files || files.length === 0) {
      const error = new Error('Please choose files');
      error.httpStatusCode = 400;
      throw error;
    }

    const result = await process(files);
    res.send(result);
  } catch (error) {
    next(error);
  }

  return null;
});

module.exports = router;
