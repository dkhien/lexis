const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const Directory = {
  RESULTS: 'results',
  UPLOADS: 'uploads',
};

const MimeType = {
  PDF: 'application/pdf',
};

/**
 * Writes content to a file.
 * @param {string} filePath The target file path.
 * @param {string} content The content to write.
 */
const writeContentToFile = (filePath, content) => {
  try {
    const resultDir = path.dirname(filePath);

    if (!fs.existsSync(resultDir)) {
      fs.mkdirSync(resultDir, { recursive: true });
    }

    fs.writeFileSync(filePath, content);

    return filePath;
  } catch (error) {
    logger.error('An error occurred while writing content to file:', error);
    throw error;
  }
};

module.exports = {
  writeContentToFile,
  Directory,
  MimeType,
};
