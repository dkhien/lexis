const fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');
const { Directory } = require('../utils/fileUtils');
const winstonLogger = require('../utils/logger');

function addStyleToHtml(fileName, style) {
  const filePath = path.join(__dirname, '../', Directory.RESULTS, fileName);

  let html = fs.readFileSync(filePath, 'utf8');
  let styleTag = '';

  try {
    if (style.newLinkColor) {
      styleTag += `a { color: ${style.newLinkColor}; }\n`;
    }
    if (style.headerFontSizeValue) {
      styleTag += `h1 { font-size: ${style.headerFontSizeValue}; }\n`;
    }
    if (style.textFontSizeValue) {
      styleTag += `p { font-size: ${style.textFontSizeValue}; }\n`;
    }
    styleTag += 'body { \n';
    if (style.newTextColor) {
      styleTag += `color: ${style.newTextColor};\n`;
    }
    if (style.newBackgroundColor) {
      styleTag += `background-color: ${style.newBackgroundColor};\n`;
    }
    if (style.fontFamilyValue) {
      styleTag += `font-family: ${style.fontFamilyValue};\n`;
    }
    styleTag += '}\n';
  } catch (error) {
    throw new Error('Invalid style object');
  }

  html = html.replace(/<style>[\s\S]*?<\/style>/g, `<style>\n${styleTag}</style>`);

  fs.writeFileSync(filePath, html);
}

async function convertHtmlToPdf(fileName) {
  const normalizedFileName = fileName.replace('.html', '.pdf');
  const htmlPath = path.join(__dirname, '../', Directory.RESULTS, fileName);
  const pdfPath = path.join(__dirname, '../', Directory.RESULTS, normalizedFileName);

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen');

    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      // margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' }
    });

    await browser.close();
  } catch (error) {
    winstonLogger.error(`Error converting HTML to PDF: ${error}`);
  }

  return pdfPath;
}

async function addStyleAndConvertToPdf(fileName, style) {
  addStyleToHtml(fileName, style);
  return convertHtmlToPdf(fileName);
}

exports.addStyleAndConvertToPdf = addStyleAndConvertToPdf;
