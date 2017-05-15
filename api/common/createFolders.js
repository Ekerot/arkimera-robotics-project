const fs = require('fs');

module.exports = function createFolders() {
  if (!fs.existsSync('files')) {
    fs.mkdirSync('files');
  }
  if (!fs.existsSync('tmp')) {
    fs.mkdirSync('tmp');
  }
};
