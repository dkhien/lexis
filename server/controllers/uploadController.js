const path = require('path');
const { imagesToText } = require('../services/tesseract');
const { convertPdf } = require('../services/poppler');
const winstonLogger = require('../utils/logger');
const {
  writeContentToFile, normalizeFileName, Directory, MimeType,
} = require('../utils/fileUtils');

/**
 * Generates HTML content based on OCR results.
 * @param {Object} ocrResults The object containing OCR results.
 * @returns {Object} An object containing the HTML paths.
 */
async function generateHtml(ocrResults) {
  const htmlPaths = {};

  Object.keys(ocrResults).forEach(async (filename) => {
    let html = '<html><body>';
    html += `<h1>${filename}</h1>`;
    const results = ocrResults[filename];

    if (Array.isArray(results)) {
      html += '<ul>';
      results.forEach((result, index) => {
        html += `<li><a href="#page-${index + 1}">Page ${index + 1}</a></li>`;
      });
      html += '</ul>';

      results.forEach((result, index) => {
        html += `<h2 id="page-${index + 1}">Page ${index + 1}</h2>`;
        html += `<p>${result}</p>`;
      });
    } else {
      html += `<p>${results}</p>`;
    }

    html += '</body></html>';

    const filePath = path.join(__dirname, '../', Directory.RESULTS, `${filename}.html`);
    writeContentToFile(filePath, html);

    const parentDir = path.resolve(__dirname, '..');
    const relativePath = filePath.replace(parentDir, '');
    htmlPaths[filename] = relativePath;
  });

  return htmlPaths;
}

async function generateJson(ocrResults) {
  const objectPaths = {};

  Object.keys(ocrResults).forEach(async (filename) => {
    const results = ocrResults[filename];
    const json = {
      pages: 0,
      content: [],
    };

    if (Array.isArray(results)) {
      json.pages = results.length;
      results.forEach((result) => {
        json.content.push(result);
      });
    } else {
      json.pages = 1;
      json.content.push(results);
    }
    const jsonContent = JSON.stringify(json);
    const filePath = path.join(__dirname, '../', Directory.RESULTS, `${filename}.json`);
    writeContentToFile(filePath, jsonContent);

    const parentDir = path.resolve(__dirname, '..');
    const relativePath = filePath.replace(parentDir, '');
    objectPaths[filename] = relativePath;
  });

  return objectPaths;
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

async function processFiles(files) {
  // STEP 1: OCR
  const ocrResults = await ocr(files);

  // STEP 2: Generate HTML and JSON files
  const htmlResults = await generateHtml(ocrResults);
  await generateJson(ocrResults);

  // STEP 3: Return result file name
  const results = Object.keys(htmlResults).map((filename) => ({
    resultFile: `${filename}`,
    content: Array.isArray(ocrResults[filename]) ? ocrResults[filename] : [ocrResults[filename]],
  }));
  return results;
}

async function processTexts(textDocs) {
  const textContents = {};
  textDocs.forEach((doc) => {
    const resultFileName = `${normalizeFileName(doc.name)}-${doc.id}`;
    textContents[resultFileName] = doc.content;
  });
  const htmlResults = await generateHtml(textContents);
  await generateJson(textContents);

  const results = Object.keys(htmlResults).map((filename) => ({
    resultFile: `${filename}`,
  }));

  return results;
}

module.exports = { processFiles, processTexts };
