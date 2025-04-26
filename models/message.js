const mongoose = require('mongoose');
const dayjs = require('dayjs');
const getNextSequenceValue = require('../utils/getNextSequenceValue');

const MessageSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    nickname: String,
    content: String,
    createData: {
        type: String,
        default: () => dayjs().format('YYYY-MM-DD HH:mm:ss')
    },
    avatar: String,
    blogId: Number,
  });

module.exports = mongoose.model('message', MessageSchema);

