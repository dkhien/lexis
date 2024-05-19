const read = require('node-read');

function readWebsite(url) {
  return new Promise((resolve, reject) => {
    read(url, (err, article) => {
      if (err) {
        reject(err);
        return;
      }

      const { content } = article;
      const { title } = article;

      resolve({ content, title });
    });
  });
}

module.exports = { readWebsite };
