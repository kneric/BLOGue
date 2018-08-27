const express = require('express');
const router = express.Router();
const {signin, signup} = require('../controllers/indexC');

router
  .get('/', (req, res) => {
    res.render('index', { title: 'Express' });
  })
  .post('/signup', signup)
  .post('/signin', signin)

module.exports = router
