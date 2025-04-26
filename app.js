var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');

var indexRouter = require('./routes/index');
var blogRouter = require('./routes/blog');
var bannerRouter = require('./routes/banner');
var authRouter = require('./routes/auth');
var projectRouter = require('./routes/project');
var messageRouter = require('./routes/message');

var app = express();

// 连接数据库
connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/blog', blogRouter);
app.use('/api/banners', bannerRouter);
app.use('/api/auth', authRouter);
app.use('/api/project', projectRouter);
app.use('/api/message', messageRouter);

module.exports = app;