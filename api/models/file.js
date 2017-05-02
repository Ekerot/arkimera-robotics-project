const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  originalTitle: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  statusID: {
    type: Number,
    required: true,
  },
  FileID: {
    type: Date,
    required: true,
  },
  companyID: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('File', FileSchema);
