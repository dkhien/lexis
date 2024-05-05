const State = Object.freeze({
  READY: 'READY',
  PROCESSING: 'PROCESSING',
  DONE: 'DONE',
  ERROR: 'ERROR',
});

const LexisDocumentType = Object.freeze({
  TEXT: 'text',
  FILE: 'file',
});

const MimeType = Object.freeze({
  PDF: 'application/pdf',
  ZIP: 'application/zip',
  IMAGE: 'image/',
  TEXT: 'text/plain',
});

export { State, LexisDocumentType, MimeType };
