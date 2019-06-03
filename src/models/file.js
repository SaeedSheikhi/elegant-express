const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number
  },
  { timestamps: true }
);

module.exports = fileSchema;
