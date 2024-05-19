const fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');
const { Directory } = require('../utils/fileUtils');
const winstonLogger = require('../utils/logger');

function addStyleToHtml(fileName, style) {
  let styleTag = '';
  if (style === undefined || style === null || Object.keys(style).length === 0) {
    styleTag += 'body { \n';
    styleTag += 'background-color: #fbfbc8; \n';
    styleTag += 'color: black; \n';
    styleTag += 'font-family: Roboto, sans-serif; \n';
    styleTag += 'font-size: 16px; \n';
    styleTag += 'padding: 3rem; \n';
    styleTag += '} \n';
  } else {
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
    styleTag += 'padding: 3rem; \n';
    styleTag += '}\n';
  }

  const filePath = path.join(__dirname, '../', Directory.RESULTS, `${fileName}.html`);

  let html = fs.readFileSync(filePath, 'utf8');

  html = html.replace(/<style>[\s\S]*?<\/style>/g, `<style>\n${styleTag}</style>`);

  fs.writeFileSync(filePath, html);
}

async function convertHtmlToPdf(fileName) {
  const htmlPath = path.join(__dirname, '../', Directory.RESULTS, `${fileName}.html`);
  const pdfPath = path.join(__dirname, '../', Directory.RESULTS, `${fileName}.pdf`);

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
