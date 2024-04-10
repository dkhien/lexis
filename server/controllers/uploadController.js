const { imagesToText } = require('../services/tesseract');
const { convertPdf } = require('../services/poppler');

async function ocr(files) {
  const ocrResults = {};

  // OCR for images
  const imageFiles = files.filter((file) => file.mimetype !== 'application/pdf');
  const imageResults = await imagesToText(imageFiles.map((file) => file.path));
  imageResults.forEach((result, index) => {
    ocrResults[imageFiles[index].filename] = result;
  });

  // OCR for PDFs
  const pdfFiles = files.filter((file) => file.mimetype === 'application/pdf');
  await Promise.all(pdfFiles.map(async (file) => {
    // Convert PDF to images and OCR each image
    const imagePaths = await convertPdf(file.path);
    const pdfResults = await imagesToText(imagePaths);
    ocrResults[file.filename] = pdfResults;
  }));

  return files.map((file) => ({ [file.filename]: ocrResults[file.filename] }));
}

async function processFiles(files) {
  const ocrResults = await ocr(files);
  return ocrResults;
}

module.exports = { processFiles };
