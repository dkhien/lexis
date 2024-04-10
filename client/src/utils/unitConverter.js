/**
 * Converts a file size in bytes to a human-readable format.
 *
 * @param {number} fileSize - The file size in bytes.
 * @returns {string} The converted file size with the appropriate unit (B, KB, MB, GB, TB).
 */
export default function convertSize(fileSize) {
  if (fileSize < 1024) {
    return `${fileSize} B`;
  } if (fileSize < 1024 * 1024) {
    return `${(fileSize / 1024).toFixed(2)} KB`;
  } if (fileSize < 1024 * 1024 * 1024) {
    return `${(fileSize / 1024 / 1024).toFixed(2)} MB`;
  } if (fileSize < 1024 * 1024 * 1024 * 1024) {
    return `${(fileSize / 1024 / 1024 / 1024).toFixed(2)} GB`;
  }
  return `${(fileSize / 1024 / 1024 / 1024 / 1024).toFixed(2)} TB`;
}
