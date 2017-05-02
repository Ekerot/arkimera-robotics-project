const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  statusID: {
    type: Number,
    required: true,
  },
  FileID: {
    type: Number,
    required: true,
  },
  companyID: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Files', FileSchema);
