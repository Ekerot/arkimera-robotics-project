module.exports = {
  destination: (req, file, cb) => {
    cb(null, 'tmp');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.pdf`);
  },
};
