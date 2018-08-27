const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentModelSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please input your name']
  },
  comment: {
    type: String,
    required: [true, 'please input your comment']
  },
  commenter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article'
  }
}, {timestamps:true})

const CommentModel = mongoose.model('CommentModel', CommentModelSchema)

module.exports = CommentModel;
