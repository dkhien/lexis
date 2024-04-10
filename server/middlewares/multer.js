const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uuidv4 = require('uuid').v4;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    fs.mkdir(uploadPath, () => {
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    const randomId = uuidv4();
    cb(null, `${randomId}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
