const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
      unique: true
    },
    midImg: {
      type: String,
      required: true
    },
    bigImg: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  });

module.exports = mongoose.model('banner', BannerSchema);

