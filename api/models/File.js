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
  status: {
    type: String,
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

  extractionTime: {
    type: Number,
    required: false,
  },
  extractedData: {
    type: Object,
    required: false,
    default: {},
  },
  bookedData: {
    type: Object,
    required: false,
    default: {},

  },
});

module.exports = mongoose.model('Files', FileSchema);
