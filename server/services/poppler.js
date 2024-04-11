const { Poppler } = require('node-poppler');
const fs = require('fs');
const path = require('path');
const winstonLogger = require('../utils/logger');
const { Directory } = require('../utils/fileUtils');

const OutputFileType = {
  PNG: 'png',
  TXT: 'txt',
  HTML: 'html',
};

/**
 * Converts a PDF file to the specified output type.
 * @param {string} pdf - The path to the PDF file.
 * @param {string} [outputType=OutputFileType.PNG] - The output file type. Defaults to PNG.
 * @returns {Array<string>} An array of paths to the converted output files.
 * @throws {Error} If the specified output type is not supported.
 */
async function convertPdf(pdf, outputType = OutputFileType.PNG) {
  const poppler = new Poppler();
  const options = {
    firstPageToConvert: 1,
    lastPageToConvert: -1,
  };

  const outputFolder = path.join(__dirname, '../', Directory.UPLOADS, `${path.basename(pdf, path.extname(pdf))}_${outputType}`);

  fs.mkdirSync(outputFolder, { recursive: true });
  const outputFile = path.join(outputFolder, 'output');
  switch (outputType) {
    case OutputFileType.PNG:
      await poppler.pdfToCairo(pdf, outputFile, { ...options, pngFile: true });
      break;
    case OutputFileType.TXT:
      await poppler.pdfToText(pdf, outputFile, options);
      break;
    case OutputFileType.HTML:
      await poppler.pdfToHtml(pdf, outputFile, options);
      break;
    default:
      throw new Error(`Unsupported convert type: ${outputType}`);
  }

  winstonLogger.info(`PDF to ${outputType} conversion complete. Output folder: ${path.resolve(outputFolder)}`);

  return fs.readdirSync(outputFolder).map((file) => path.join(outputFolder, file));
}

module.exports = { convertPdf, OutputFileType };
