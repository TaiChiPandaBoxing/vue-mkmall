const express = require('express');

const router = express.Router();
/* eslint-disable no-unused-vars */
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
