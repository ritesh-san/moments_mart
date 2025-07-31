const mongoose = require('../database/dbconnect');

const cartSchema = mongoose.Schema({
  cart_number: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  customer_id: {
    type: String,
    required: true,
  },
  customer_email: {
    type: String,
    required: true
  },
  customer_name: {
    type: String,
    required: true
  },
  items: {
    type: Array
  },
  subtotal: {
    type: Number,
  },
  tax: {
    type: Number,
  },
  shipping_amount: {
    type: Number
  },
  total: {
    type: Number,
  },
  shipping_method: {
    type: String
  },
  shipping_address: {
    type: String
  },
  billing_address: {
    type: String
  },
  order_id: {
    type: String
  },

}, {
  timestamps: true
});

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;
