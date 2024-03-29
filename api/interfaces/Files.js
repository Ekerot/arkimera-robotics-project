const fs = require('fs');
const Files = require('../models/File');

module.exports = {
  save: data =>
    new Promise((resolve, reject) => {
      Files.findOne({ FileID: data.fileID }).exec((err, file) => {
        if (err) {
          return reject(err);
        }

        if (file) {
          return reject('File already saved in db');
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

        newFile.save().then(doc => resolve(doc)).catch(error => reject(error));
      });
    }),

  update: data =>
    new Promise((resolve, reject) => {
      Files.findOne({ FileID: data.fileID }).exec((err, file) => {
        if (err) {
          return reject(err);
        }

        if (!file) {
          return reject('File not found!');
        }

        const updatedFile = file;
        updatedFile.status = data.status;

        if (data.bookedData) {
          updatedFile.bookedData = data.bookedData;
        } else if (data.extractedData) {
          updatedFile.extractedData = data.extractedData;
        }
        if (data.extractionTime) {
          updatedFile.extractionTime = data.extractionTime;
        }

        updatedFile.save((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      });
    }),

  get: data =>
    new Promise((resolve, reject) => {
      Files.find(data).exec((err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    }),

  move: oldPath =>
    new Promise((resolve, reject) => {
      const newPath = `files/${oldPath.split('/')[1]}`;
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          if (err.code === 'EXDEV') {
            const rs = fs.createReadStream(oldPath);
            const ws = fs.createWriteStream(newPath);

            rs.on('error', error => reject(error));
            ws.on('error', error => reject(error));

            rs.on('close', () => {
              fs.unlink(oldPath, (error) => {
                if (error) {
                  return reject(error);
                }
                return resolve(newPath);
              });
            });

            rs.pipe(ws);
          } else {
            return reject(err);
          }
        }
        return resolve(newPath);
      });
    }),

  remove: path => new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) {
        return reject();
      }
      return resolve();
    });
  }),
};
