const File = require('../models/File');

module.exports = {
  save: (data) => {
    File.findOne({ FileID: data.fileID }).then((err, file) => {
      if (err) {
        throw err;
      }

      if (file) {
        throw new Error('File already saved in db');
      }

      const newFile = new File({
        username: data.username,
        path: data.file.path,
        originalname: data.file.originalname,
        filename: data.file.filename,
        status: data.status,
        FileID: data.fileID,
        companyID: data.companyID,
      });

      newFile.save().then(doc => doc);
    });
  },
  updateStatus: (fileID, status) => {
    File.findOne({ FileID: fileID }).then((err, file) => {
      if (err) {
        throw err;
      }

      if (!file) {
        throw new Error('File not found!');
      }

      const updatedFile = file;
      updatedFile.status = status;

      updatedFile.save((error) => {
        if (error) {
          throw new Error(error);
        }
      });
    });
  },
};
