const tesseract = require('node-tesseract-ocr');

function imageToText(image, language) {
  return tesseract.recognize(image, { lang: language });
}

module.exports = imageToText;
