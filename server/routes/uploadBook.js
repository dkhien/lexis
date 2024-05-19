const express = require('express');
const fs = require('fs');
const { updateBook } = require('../services/firebase');

const upload = require('../middlewares/multer');
const { processFiles } = require('../controllers/uploadController');

const router = express.Router();

router.post('/uploadBook', upload.single('file'), async (req, res, next) => {
  try {
    const { file } = req;
    const files = [file];
    const fileBook = JSON.parse(req.body['file-book']);
    const fileBooks = [fileBook];
    const result = await processFiles(files, fileBooks);
    const bookFileName = result[0].resultFile;
    const pdfFilePath = `${bookFileName}.json`;
    const jsonContent = fs.readFileSync(`./results/${pdfFilePath}`, 'utf8');
    const { content } = JSON.parse(jsonContent);

    const {
      isbn, title, author, language, description,
    } = fileBook;
    console.log(author, description, language, title, content, isbn);

    const book = await updateBook(author, description, language, title, content, isbn);
    res.send(`Book uploaded successfully!${this.toString(book)}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
