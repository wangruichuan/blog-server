const express = require('express');
const router = express.Router();
const response = require('../utils/response');


router.post('/login', async function(req, res) {
  try {
    const {username,password,code} = req.body;
    if(!username || !password || !code){
      res.json(response.error('缺少必传项'));
      return;
    }
    if(username!=='admin' ||password!=='123456' ||code!=='1234'){
      res.json(response.error('用户名或密码错误'));
      return;
    }
    const token = 'wrc112233';
    res.json(response.success(
      {
        token 
      }
    ));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/captcha', async function(req, res) {
    try {
      res.json(response.success("1234"));
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


  router.get('/me', async function(req, res) {
    try {
      res.json(response.success({
        username: 'admin',
        rules: ['admin']
      }));
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;