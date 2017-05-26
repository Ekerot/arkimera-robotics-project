module.exports = {
  destination: (req, file, cb) => {
    cb(null, 'tmp');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.pdf`);
  },
};
