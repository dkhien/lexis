const tesseract = require('node-tesseract-ocr');

/**
 * Converts an image to text using OCR (Optical Character Recognition).
 * @param {string} image - The image to be converted to text.
 * @param {string} [language='eng'] - Language of the text. Defaults to 'eng' (English).
 * @returns {Promise<string>} A promise that resolves to the recognized text.
 */
function imageToText(image, language = 'eng') {
  return tesseract.recognize(
    image,
    {
      lang: language,
      oem: 1, // Automatic page segmentation with OSD
      psm: 3, // Assume a single uniform block of text.
    },
  );
}

/**
 * Converts an array of images to text using OCR (Optical Character Recognition).
 * @param {string[]} images - The images to be converted to text.
 * @param {string} [language='eng'] - Language of the text. Defaults to 'eng' (English).
 * @returns {Promise<string[]>} A promise that resolves to an array of recognized texts.
 */
function imagesToText(images, language = 'eng') {
  return Promise.all(images.map((image) => imageToText(image, language)));
}

module.exports = {
  imageToText,
  imagesToText,
};
