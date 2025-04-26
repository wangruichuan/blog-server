const express = require('express');
const router = express.Router();
const Banner = require('../models/banner');
const response = require('../utils/response');

/* GET users listing. */
router.get('/', async function(req, res) {
  try {
    const banners= await Banner.find();
    res.json(response.success(banners));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;