const Article = require('../models/article');
const CommentModel = require('../models/comment');

const createArticle = (req, res) => {
  const {title, content, thumbnail} = req.body;
  let author = req.user

  Article.create({
    title,
    content,
    thumbnail,
    author: author._id
  })
  .then(article => {
    res.status(201).json(article)
  })
  .catch (err => {
    res.status(400).json(err)
  })
}

const allArticle = (req, res) => {
  Article.find()
  .sort({updatedAt: 'descending'})
  .populate('author')
  .then(articles => {
    res.status(200).json(articles)
  })
  .catch (err => {
    res.status(400).json(err)
  })
}

const userArticle = (req, res) => {
  Article.find({author: req.user._id})
  .sort({updatedAt: 'descending'})
  .populate('author')
  .then(articles => {
    if (articles){
      res.status(200).json(articles)
    } else {
      res.status(404).json('user not found')  
    }
  })
  .catch (err => {
    res.status(400).json(err)
  })
}

const articleById = (req, res) => {
  Article.findById(req.params.id)
  .populate('author')
  .then(article => {
    if (article){
      res.status(200).json(article)
    } else {
      res.status(404).json('article not found')  
    }
  })
  .catch (err => {
    res.status(400).json(err)
  })
}

const updateArticle = (req, res) => {
  Article.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
  .then( article => {
    res.status(200).json(article)
  })
  .catch( err => {
    res.status(400).json(err)
  })
}

const deleteArticle = (req, res) => {
  Article.findByIdAndRemove(req.params.id)
  .then( article => {
    res.status(200).json(article)
  })
  .catch( err => {
    res.status(400).json(err)
  })
}

const addComment = (req, res) => {
  CommentModel.create({
    comment: req.body.comment,
    // commenter: req.user._id,
    commenter: '5b82e597a24a0556fa03cf41',
    article: req.params.id
  })
  .then(comment => {
    return Article.findByIdAndUpdate(req.params.id, {$push: {comments: comment._id}})
    .then(article => {
      res.status(201).json({article, comment})
    })
  })
  .catch (err => {
    res.status(400).json(err)
  })
}

const deleteComment = (req, res) => {
  Article.findByIdAndUpdate(req.params.id, {$pull: {comments: req.headers.comment}})
  .then( article => {
    return CommentModel.findByIdAndRemove(req.headers.comment)
    .then(comment => {
      res.status(200).json({comment, article})
    })
  })
  .catch( err => {
    res.status(400).json(err)
  })
}

module.exports = {
  createArticle,
  allArticle,
  userArticle,
  articleById,
  updateArticle,
  deleteArticle,
  addComment,
  deleteComment
};
