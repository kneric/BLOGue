const express = require('express');
const router = express.Router();
const {
  createArticle, 
  allArticle, 
  userArticle, 
  articleById,
  updateArticle,
  deleteArticle,
  addComment,
  deleteComment
} = require('../controllers/articleC');
const auth = require('../middlewares/auth');

router
  .post('/', auth, createArticle)
  .get('/', allArticle)
  .get('/user', auth, userArticle)
  .get('/:id', articleById)
  .put('/:id', auth, updateArticle)
  .delete('/:id', auth, deleteArticle)
  .post('/:id/comment',  addComment)
  .delete('/:id/comment',  deleteComment)

module.exports = router