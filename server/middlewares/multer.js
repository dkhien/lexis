const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    fs.mkdir(uploadPath, () => {
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    const randomId = Math.random().toString(36).substring(2, 8);
    cb(null, `${randomId}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
