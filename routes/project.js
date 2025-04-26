const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const response = require('../utils/response');

/* GET users listing. */
router.get('/', async function(req, res) {
  try {
    const projects= await Project.find();
    res.json(response.success(projects));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;