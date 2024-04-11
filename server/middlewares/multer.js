const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uuidv4 = require('uuid').v4;
const { Directory } = require('../utils/fileUtils');

/**
 * Normalizes a file name to avoid file operation errors.
 *
 * @param {string} fileName - The original file name.
 * @returns {string} The normalized file name.
 */
const normalizeFileName = (fileName) => {
  // Remove accents (for example, in Vietnamese words)
  let normalizedFileName = fileName.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');

  // Replace spaces with hyphens
  normalizedFileName = normalizedFileName.replace(/\s/g, '-');

  // Remove all special characters
  normalizedFileName = normalizedFileName.replace(/[^a-zA-Z0-9-]/g, '');

  return normalizedFileName;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../', Directory.UPLOADS);
    fs.mkdir(uploadPath, () => {
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    const randomId = uuidv4();
    const originalFileName = normalizeFileName(file.originalname);
    const fileName = `${randomId}-${Date.now()}-${originalFileName}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage });

module.exports = upload;
