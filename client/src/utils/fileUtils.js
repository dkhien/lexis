import { MimeType } from '../constants';

const isImageFile = (fileType) => fileType.startsWith(MimeType.IMAGE);

const isPDFFile = (fileType) => fileType === MimeType.PDF;

const isTextFile = (fileType) => fileType === MimeType.TEXT;

export { isImageFile, isPDFFile, isTextFile };
