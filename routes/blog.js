const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const BlogType = require('../models/blogtype');
const Comment = require('../models/comment');
const response = require('../utils/response');
const getNextSequenceValue = require('../utils/getNextSequenceValue');
const htmlToToc = require('../utils/htmlToToc');
const getRandomAvatar = require('../utils/getRandomAvatar');

// 删除博客评论
router.delete('/comment', async function (req, res) {
  try {
    const { blogId, id } = req.query;
    await Comment.deleteOne({ id: id });
    await Blog.updateOne({ id: blogId }, {
      $inc: {
        commentNumber: -1
      }
    })
    res.json(response.success("删除评论成功"));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 添加博客评论
router.post('/comment', async function (req, res) {
  try {
    const { blogId, nickName:nickname, content } = req.body;
    const newId = await getNextSequenceValue(`commentid`)
    const comment = new Comment({
      id:newId,
      blogId: blogId,
      nickname: nickname,
      content: content,
      avatar: getRandomAvatar()
    });
    await comment.save();
    await Blog.updateOne({ id: blogId }, {
      $inc: {
        commentNumber: 1
      }
    })
    res.json(response.success(comment));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 返回博客评论
router.get('/comment', async function (req, res) {
  try {
    const { blogId, page, limit } = req.query;
    let query = {}; // 初始化查询条件为空对象
    if (blogId!== '-1') {
      query = { blogId: blogId };
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Comment.countDocuments(query);
    const comments = await Comment.find(query).skip(skip).limit(parseInt(limit)).lean();

    res.json(response.success({
      total,
      rows: comments.reverse()
    }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取博客类型
router.get('/types', async function (req, res) {
  try {
    const blogtypes = await BlogType.find();
    await Promise.all(blogtypes.map(async (blogtype) => {
      blogtype.articleCount = await Blog.countDocuments({ 'categoryId': blogtype.id });
    }))
    res.json(response.success(blogtypes));
  } catch (err) {
    console.log(123)
    res.status(500).json({ message: err.message });
  }
});


// 添加博客
router.post('/', async function (req, res) {
  try {
    const blog = new Blog(req.body);
    // 填充id
    const newId = await getNextSequenceValue(`blogid`)
    blog.id = newId;
    blog.scanNumber = 0
    blog.commentNumber = 0
    await blog.save()
    res.json(response.success('添加博客成功'));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 更新博客
router.put('/', async function (req, res) {
  try {
    const { id, title, desciption, categoryId, markdown, htmlContent, thumb } = req.body;
    console.log('category', req.body);
    await Blog.updateOne({ id: id }, {
      $set: {
        title: title,
        desciption: desciption,
        categoryId: categoryId,
        markdown: markdown,
        htmlContent: htmlContent,
        thumb: thumb
      }
    })

    res.json(response.success('更新博客成功'));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 删除单个博客
router.delete('/', async function (req, res) {
  try {
    await Blog.deleteOne({ id: req.query.id })
    await Comment.deleteMany({ blogId: req.query.id })
    res.json(response.success('删除博客成功'));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 获取博客列表
router.get('/list', async function (req, res) {
  try {
    const { page = 1, limit = 10, categoryId = -1 } = req.query;
    console.log('categoryId', categoryId);
    // 将 page 和 limit 转换为整数
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // 计算要跳过的文档数量
    const skip = (pageNumber - 1) * limitNumber;

    // 构建查询条件
    const query = {};
    if (categoryId && categoryId != -1) {
      query.categoryId = categoryId;
    }

    // 执行分页查询
    const blogs = await Blog.find(query)
      .skip(skip)
      .limit(limitNumber)
      .lean()


    // 计算总文档数量
    const total = await Blog.countDocuments(query);

    await Promise.all(blogs.map(async (blog) => {
      const cate = await BlogType.findOne({ 'id': blog.categoryId });
      blog.category = cate;
      delete blog.categoryId;
      delete blog.toc
      delete blog.htmlContent
      delete blog.markdown
      delete blog._id
      delete blog.__v
    }))

    const result = {
      total,
      rows: blogs.reverse(),
    }
    res.json(response.success(result));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// 修改博客类型
router.put('/type', async function (req, res) {
  try {
    await BlogType.updateOne({ id: req.query.id }, {
      $set: {
        name: req.query.name,
      }
    })
    res.json(response.success('修改成功'));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// 添加文章类型
router.post('/type', async function (req, res) {
  try {
    const newId = await getNextSequenceValue(`blogtypeid`)
    await BlogType.insertOne({
      id: newId,
      name: req.query.name,
    })
    res.json(response.success('添加成功'));
  } catch (err) {
    res.status(500).json(response.error(err.message));
  }
});

// 删除文章类型（会删除该类型下所有的文章）
router.delete('/type', async function (req, res) {
  try {
    const typeId = req.query.id;
    //拿到该类型下所有博客的id
    const blogs = await Blog.find({ categoryId: typeId })
    const blogIds = blogs.map(blog => blog.id);
    //删除该类型下所有的评论
    await Comment.deleteMany({ blogId: { $in: blogIds } })
    //删除该类型下所有的博客
    await Blog.deleteMany({ categoryId: typeId })
    await BlogType.deleteOne({ id: typeId })
    res.json(response.success('删除文章成功'));
  } catch (err) {
    res.status(500).json(response.error(err.message));
  }
});
// 获取单个博客
router.get('/:id', async function (req, res) {
  try {

    const blog = await Blog.findOne({ id: req.params.id }).lean();
    const categoryId = blog.categoryId;
    const category = await BlogType.findOne({ id: categoryId });
    blog.category = category;
    const toc = htmlToToc(blog.htmlContent)
    blog.toc = toc;
    res.json(response.success(blog));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;