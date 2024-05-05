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

/**
 * Normalizes a file name to avoid file operation errors.
 *
 * @param {string} fileName - The original file name.
 * @returns {string} The normalized file name.
 */
const normalizeFileName = (fileName) => {
  // Remove accents (for example, in Vietnamese words)
  let normalizedFileName = fileName.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');

  // Replace spaces with hyphens
  normalizedFileName = normalizedFileName.replace(/\s/g, '-');

  // Remove all special characters
  normalizedFileName = normalizedFileName.replace(/[^a-zA-Z0-9-]/g, '');

  return normalizedFileName;
};

module.exports = {
  writeContentToFile,
  normalizeFileName,
  Directory,
  MimeType,
};
