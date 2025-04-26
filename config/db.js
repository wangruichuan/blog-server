const mongoose = require('mongoose');
require('dotenv').config();

// 设置全局toJSON转换器
mongoose.set('toJSON', {
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.__v;
  }
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;