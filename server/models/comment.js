const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentModelSchema = new Schema({
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
