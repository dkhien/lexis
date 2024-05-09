const path = require('path');
const { imagesToText } = require('../services/tesseract');
const { convertPdf } = require('../services/poppler');
const winstonLogger = require('../utils/logger');
const { writeContentToFile, Directory, MimeType } = require('../utils/fileUtils');

/**
 * Generates HTML content based on OCR results.
 * @param {Object} ocrResults The object containing OCR results.
 * @returns {Object} An object containing the HTML paths.
 */
async function generateHtml(ocrResults) {
  const htmlPaths = {};

  Object.keys(ocrResults).forEach(async (filename) => {
    let html = `
    <html>
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Lexend+Mega:wght@100..900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Lexend+Mega:wght@100..900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Lexend+Mega:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Lexend+Mega:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Lexend+Mega:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Lexend+Mega:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet">
        <style>
        </style>
    </head>
    <body>
    `;    html += `<h1>${filename}</h1>\n`;
    const results = ocrResults[filename];

    if (Array.isArray(results)) {
      html += '<ul>\n';
      results.forEach((result, index) => {
        result = result.replace(/\n/g, '<br>\n');
        html += `<li><a href="#page-${index + 1}">Page ${index + 1}</a></li>\n`;
      });
      html += '\n</ul>\n';

      results.forEach((result, index) => {
        result = result.replace(/\n/g, '<br>\n');
        html += `<h2 id="page-${index + 1}">Page ${index + 1}</h2>\n`;
        html += `<p>\n${result}\n</p>\n`;
      });
    } else {
      result = result.replace(/\n/g, '<br>\n');
      html += `\n<p>${results}</p>\n`;
    }
    html += '\n</body>\n</html>\n';

    const filePath = path.join(__dirname, '../', Directory.RESULTS, `${filename}.html`);
    writeContentToFile(filePath, html);

    const parentDir = path.resolve(__dirname, '..');
    const relativePath = filePath.replace(parentDir, '');
    htmlPaths[filename] = relativePath;
  });

  return htmlPaths;
}

/**
 * Performs OCR (Optical Character Recognition) on the given files.
 * @param {Array} files The files to perform OCR on.
 * @returns {Object} An object containing the OCR results for each file.
 */
async function ocr(files) {
  const ocrResults = {};

  // OCR for images
  const imageFiles = files.filter((file) => file.mimetype !== MimeType.PDF);
  const imageResults = await imagesToText(imageFiles.map((file) => file.path));
  imageResults.forEach((result, index) => {
    ocrResults[imageFiles[index].filename] = result;
  });

  // OCR for PDFs
  const pdfFiles = files.filter((file) => file.mimetype === MimeType.PDF);
  await Promise.all(pdfFiles.map(async (file) => {
    // Convert PDF to images and OCR each image
    winstonLogger.info(`Converting PDF to image: ${file.filename}`);
    const imagePaths = await convertPdf(file.path);
    const pdfResults = await imagesToText(imagePaths);
    ocrResults[file.filename] = pdfResults;
  }));

  return ocrResults;
}

async function process(files) {
  // STEP 1: OCR
  const ocrResults = await ocr(files);

  // STEP 2: Generate HTML
  const htmlResults = await generateHtml(ocrResults);

  // STEP 3: Return results
  const results = Object.keys(htmlResults).map((filename) => ({
    resultFile: `${filename}.html`,
    resultPath: htmlResults[filename],
  }));
  return results;
}

module.exports = { process };
