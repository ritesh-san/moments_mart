const mongoose = require('../database/dbconnect');

const customerSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['user', 'vendor'], 
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },

  
  companyName: {
    type: String,
    required: function() {
      return this.type === 'vendor';
    },
  },
  idNo: {
    type: String,
    required: function() {
      return this.type === 'vendor';
    },
  },
  businessType: {
    type: Array,
    required: function() {
      return this.type === 'vendor';
    },
  },

}, {
  timestamps: true
});

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;
