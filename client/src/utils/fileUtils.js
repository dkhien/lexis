import { MimeType, LexisDocumentType } from '../constants';

const isImageFile = (fileType) => fileType.startsWith(MimeType.IMAGE);

const isPDFFile = (fileType) => fileType === MimeType.PDF;

const isTextFile = (fileType) => fileType === MimeType.TEXT;

const isTextDoc = (type) => type === LexisDocumentType.TEXT;

const isWebpageDoc = (type) => type === LexisDocumentType.WEBPAGE;

const isBookFile = (fileType) => fileType === LexisDocumentType.BOOK;

export {
  isImageFile, isPDFFile, isTextFile, isWebpageDoc, isTextDoc, isBookFile,
};
