const Files = require('../models/File');

module.exports = {
  save: data => new Promise((resolve, reject) => {
    Files.findOne({ FileID: data.fileID }).exec((err, file) => {
      if (err) {
        reject(err);
      }

      if (file) {
        reject('File already saved in db');
      }

      const newFile = new Files({
        username: data.username,
        path: data.file.path,
        originalname: data.file.originalname,
        filename: data.file.filename,
        status: data.status,
        FileID: data.fileID,
        companyID: data.companyID,
      });

      newFile.save()
        .then(doc => resolve(doc))
        .catch(error => reject(error));
    });
  }),

  updateStatus: (fileID, status) => new Promise((resolve, reject) => {
    Files.findOne({ FileID: fileID }).exec((err, file) => {
      if (err) {
        reject(err);
      }

      if (!file) {
        reject('File not found!');
      }

      const updatedFile = file;
      updatedFile.status = status;

      updatedFile.save((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }),

  get: data =>
    new Promise((resolve, reject) => {
      Files.find(data).exec((err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    }),
};