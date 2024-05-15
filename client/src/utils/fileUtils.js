import { MimeType, LexisDocumentType } from '../constants';

const isImageFile = (fileType) => fileType.startsWith(MimeType.IMAGE);

const isPDFFile = (fileType) => fileType === MimeType.PDF;

const isTextFile = (fileType) => fileType === MimeType.TEXT;

const isTextDocument = (type) => type === LexisDocumentType.TEXT;

const isBookFile = (fileType) => fileType === LexisDocumentType.BOOK;

export {
  isImageFile, isPDFFile, isTextFile, isBookFile, isTextDocument,
};
