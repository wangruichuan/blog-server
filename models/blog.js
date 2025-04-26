const mongoose = require('mongoose');
const dayjs = require('dayjs');


const blogSchema = new mongoose.Schema({
    id: String,
    title: String,
    markdown: String,
    description: String,
    categoryId: Number,
    scanNumber: Number,
    commentNumber: Number,
    thumb: {
        type: String,
        default: null
    },
    createTime: {
        type: String,
        default: () => dayjs().format('YYYY-MM-DD HH:mm:ss')
    },
    htmlContent: String,
    toc: {
        type: Object,
        default: null
    }
});

// 创建模型
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
