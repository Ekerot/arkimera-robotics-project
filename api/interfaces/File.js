const File = require('../models/File');

module.exports = {
  save: (data) => {
    // console.log(data);
    File.findOne({ FileID: data.fileID }).then((err, file) => {
      if (err) {
        throw err;
      }

      if (file) {
        throw new Error('File already saved in db');
      }

      const newFile = new File({
        username: data.username || 'admin',
        path: data.file.path,
        originalname: data.file.originalname,
        filename: data.file.filename,
        statusID: 0,
        FileID: data.fileID,
        companyID: 1,
      });

      newFile.save().then((doc) => {
        console.log(doc);
        // return newFile;
      });
    });
  },
};
