const mongoose = require('mongoose');
const dayjs = require('dayjs');

const CommentSchema = new mongoose.Schema({
    id: Number,
    nickname: String,
    content: String,
    createData: {
        type: String,
        default: () => dayjs().format('YYYY-MM-DD HH:mm:ss')
    },
    avatar: String,
    blogId: Number,
  });

module.exports = mongoose.model('comment', CommentSchema);

