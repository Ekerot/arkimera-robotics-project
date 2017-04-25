module.exports = {
  destination: (req, file, cb) => {
    cb(null, 'tmp');
  },
  filename: (req, file, cb) => {
    // TODO: better solution for filename
    cb(null, `${file.fieldname}-${Date.now()}.pdf`);
  },
};
