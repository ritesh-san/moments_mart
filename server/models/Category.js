const mongoose = require('../database/dbconnect');

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  is_show: {
    type: Boolean
  },
  products: {
    type: Array, 
     required: true,
  }
}, {
  timestamps: true
});

const Category = mongoose.model('product', CategorySchema);

module.exports = Category;
