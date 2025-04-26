const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    link: {
      type: String
    },
  });

module.exports = mongoose.model('project', ProjectSchema);

