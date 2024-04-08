const tesseract = require('node-tesseract-ocr');

function imageToText(image, language) {
  return tesseract.recognize(
    image,
    {
      lang: language,
      // Automatic page segmentation with OSD
      oem: 1,
      // Assume a single uniform block of text.
      psm: 3,
    },
  );
}

function imagesToText(images, language) {
  return Promise.all(images.map((image) => imageToText(image, language)));
}

module.exports = imageToText;
module.exports = imagesToText;
