const State = Object.freeze({
  READY: 'READY',
  PROCESSING: 'PROCESSING',
  SUMMARIZING: 'SUMMARIZING',
  DONE: 'DONE',
  ERROR: 'ERROR',
});

const LexisDocumentType = Object.freeze({
  TEXT: 'text',
  FILE: 'file',
  WEBPAGE: 'webpage',
});

const MimeType = Object.freeze({
  PDF: 'application/pdf',
  ZIP: 'application/zip',
  IMAGE: 'image/',
  TEXT: 'text/plain',
});

const Languages = Object.freeze({
  Vietnamese: 'vie',
  English: 'eng',
});

export {
  State, LexisDocumentType, MimeType, Languages,
};
