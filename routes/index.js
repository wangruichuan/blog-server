var express = require('express');
var router = express.Router();

/* GET home page. */
const response = require('../utils/response');

router.get('/', function(req, res, next) {
  const data = [
    {
      id: 1,
      midImg: 'https://pic1.imgdb.cn/item/6801259088c538a9b5d81cab.png',
      bigImg: 'https://wangruichuan-1321190606.cos.ap-beijing.myqcloud.com/blog%2F3.jpg',
      title: '第一次去卢浮宫时',
      description: '并没有什么特别的感觉',
    },
    {
      id: 2,
      midImg: 'https://pic1.imgdb.cn/item/6801259188c538a9b5d81caf.png',
      bigImg: 'https://wangruichuan-1321190606.cos.ap-beijing.myqcloud.com/blog%2F2.jpg',
      title: '因为独属于我的蒙娜丽莎',
      description: '我早已遇见',
    }
  ];
  res.json(response.success(data));
});

module.exports = router;