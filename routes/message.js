const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const Blog = require('../models/blog');
const response = require('../utils/response');
const getRandomAvatar = require('../utils/getRandomAvatar');
const getNextSequenceValue = require('../utils/getNextSequenceValue');

/* 获取用户留言 */
router.get('/', async function (req, res) {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    const total = await Message.countDocuments();
    const messages = await Message.find().skip(skip).limit(limit).lean();

    res.json(response.success({
      total,
      rows: messages
    }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 添加留言
router.post('/', async function (req, res) {
    try {
    const newId = await getNextSequenceValue(`messageid`)

      const { nickname, content } = req.body;
      
      const message = new Message({
        id:newId,
        nickname,
        content,
        avatar: getRandomAvatar()
      });
      await message.save();
      res.json(response.success(message));
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


  router.delete('/', async function (req, res) {
    try {
        const { id } = req.query;
      await Message.deleteOne({ id: id });
      res.json(response.success("删除成功"));
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;