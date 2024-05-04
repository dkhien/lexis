const fs = require('fs');
const puppeteer = require('puppeteer')
const path = require('path');
const { writeContentToFile, Directory, MimeType } = require('../utils/fileUtils');
const winstonLogger = require('../utils/logger');


function addStyleToHtml(fileName, style) {
    const filePath = path.join(__dirname, '../', Directory.RESULTS, fileName);
    
    html = fs.readFileSync(filePath, 'utf8');
    styleTag = '';

    try {
        if (style['newLinkColor']) {
            styleTag += `a { color: ${style['newLinkColor']}; }\n`;
        }
        if (style['headerFontSizeValue']) {
            styleTag += `h1 { font-size: ${style['headerFontSizeValue']}; }\n`;
        }
        if (style['textFontSizeValue']) {
            styleTag += `p { font-size: ${style['textFontSizeValue']}; }\n`;
        }
        styleTag += `body { \n`
        if (style['newTextColor']) {
            styleTag += `color: ${style['newTextColor']};\n`;
        }
        if (style['newBackgroundColor']) {
            styleTag += `background-color: ${style['newBackgroundColor']};\n`;
        }
        if (style['fontFamilyValue']) {
            styleTag += `font-family: ${style['fontFamilyValue']};\n`;
        }
        styleTag += `}\n`;
    } catch (error) {
        throw new Error('Invalid style object');
    }

    html = html.replace(/<style>[\s\S]*?<\/style>/g, `<style>\n${styleTag}</style>`);
    
    return html;
}

async function convertHtmlToPdf(fileName, htmlContent) {
    fileName = fileName.replace('.html', '.pdf');
    const pdfPath = path.join(__dirname, '../', Directory.RESULTS, fileName);

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        // To reflect CSS used for screens instead of print
        await page.emulateMediaType('screen');

        await page.setContent(htmlContent, {
            waitUntil: 'domcontentloaded'
        })
    
        await page.pdf({ 
            path: pdfPath, 
            format: 'A4',
            // margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' }
        });
    
        await browser.close();
        
    } catch (error) {
        winstonLogger.error(`Error converting HTML to PDF: ${error}`);
    }

    return pdfPath;

}

async function addStyleAndConvertToPdf(fileName, style) {
    html = addStyleToHtml(fileName, style);
    return convertHtmlToPdf(fileName, html);
}

exports.addStyleAndConvertToPdf = addStyleAndConvertToPdf;