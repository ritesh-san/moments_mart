const mongoose = require('../database/dbconnect');

const orderSchema = mongoose.Schema({
  order_number: {
    type: String,
    required: true,
  },
  status: {
    type: String
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
    required: true,
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
  shipping_ammount: {
    type: Number
  },
  total: {
    type: Number,
  },
  shipping_method: {
    type: String
  },
  shipping_address: {
    type: Object
  },
  billing_address: {
    type: Object
  },
  payment_method: {
    type: String
  },
  transaction_id: {
    type: String
  },
  cart_id: {
    type: String
  },

}, {
  timestamps: true
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
