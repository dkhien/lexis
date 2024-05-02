const AdmZip = require('adm-zip');
const path = require('path');
const { Directory } = require('../utils/fileUtils');

async function createZipFile(files) {
  const zip = new AdmZip();
  const zipName = `results-${Date.now()}.zip`;

  files.forEach((file) => {
    const filePath = path.join(__dirname, '../', Directory.RESULTS, file);
    zip.addLocalFile(filePath);
  });

  const zipPath = path.join(__dirname, '../', Directory.RESULTS, zipName);
  zip.writeZip(zipPath);

  const zipBuffer = zip.toBuffer();

  // return zipName;
  return zipBuffer;
}

module.exports = {
  createZipFile,
};
