const mongoose = require('../database/dbconnect');

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
     required: true,
  },
  productSKU: {
    type: String,
    required: true,
    unique: true,
  },
  availableDate: {
    type: Date
  },
  attributes: {
    type: Array
  },
  image: {
    type: String
  },
  price: {
    type: Number
  },
  category: {
    type: Array
  },
   vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',  
    required: true,
  }
}, {
  timestamps: true
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
