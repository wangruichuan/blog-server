const mongoose = require('mongoose');

const BlogTypeSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: true
    },
    articleCount: {
      type: Number,
      default: 0
    },
  });

module.exports = {
  BlogTypeSchema
};