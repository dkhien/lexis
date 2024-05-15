const { HfInference } = require('@huggingface/inference');
const { readFileSync } = require('node:fs');
const { extname } = require('node:path');
const winstonLogger = require('../utils/logger');

const inference = new HfInference('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');

function isTextFile(file) {
  const extension = extname(file);
  return extension === '.txt';
}

async function summarizeText(inputs) {
  winstonLogger.debug('Summarizing text...');
  try {
    const result = await inference.summarization({
      model: 'sshleifer/distilbart-cnn-12-6',
      inputs,
    });
    winstonLogger.debug('Text summarized successfully.');
    return result.summary_text;
  } catch (error) {
    winstonLogger.error(`Error summarizing text. ${error}`);
    throw error;
  }
}

async function summarizeFile(file) {
  if (!isTextFile(file)) {
    winstonLogger.debug('File is not a txt file.');
    throw new Error('Must provide a txt file');
  }
  winstonLogger.debug('Summarizing file...');
  const text = readFileSync(file, 'utf8');
  return summarizeText(text);
}

module.exports = {
  summarizeText,
  summarizeFile,
};
