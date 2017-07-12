var mongoose = require('mongoose');

var restaurantSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  workingTime: String,
  address: String,
  email: String,
  phone: Number,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);