const tesseract = require('node-tesseract-ocr');
const path = require('path');
const winstonLogger = require('../utils/logger');

/**
 * Converts an image to text using OCR (Optical Character Recognition).
 * @param {string} image - Path of input image.
 * @param {string} [language='eng'] - Language of the text. Defaults to 'eng' (English).
 * @returns {Promise<string>} A promise that resolves to the recognized text.
 */
async function imageToText(image, language = 'eng') {
  const imageName = image.split(path.sep).pop();
  winstonLogger.debug(`Converting image ${imageName} to text...`);
  try {
    const text = await tesseract.recognize(
      image,
      {
        lang: language,
        oem: 1, // Automatic page segmentation with OSD
        psm: 3, // Assume a single uniform block of text.
      },
    );
    winstonLogger.debug(`Successfully converted image ${imageName} to text.`);
    return text;
  } catch (error) {
    winstonLogger.error(`Error converting image ${imageName} to text. ${error}`);
    throw error;
  }
}

/**
 * Converts an array of images to text using OCR (Optical Character Recognition).
 * @param {string[]} images - Paths of input images.
 * @returns {Promise<string[]>} A promise that resolves to an array of recognized texts.
 */
async function imagesToText(images) {
  winstonLogger.info(`Converting ${images.length} images to text...`);
  let converted = 0;
  try {
    const results = await Promise.all(images.map(async (image) => {
      const text = await imageToText(image.file, image.language);
      converted += 1;
      winstonLogger.info(`Converted ${converted}/${images.length} images`);
      return text;
    }));
    winstonLogger.info('Images converted to text successfully');
    return results;
  } catch (error) {
    winstonLogger.error(`Error converting images to text. ${error}`);
    throw error;
  }
}

module.exports = {
  imageToText,
  imagesToText,
};
