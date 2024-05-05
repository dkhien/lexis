const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uuidv4 = require('uuid').v4;
const { Directory } = require('../utils/fileUtils');
const { normalizeFileName } = require('../utils/fileUtils');

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
    const fileName = `${originalFileName}-${randomId}-${Date.now()}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage });

module.exports = upload;
