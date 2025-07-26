const Product = require('../models/Product');
const Category = require('../models/Category')

const Productcontroller = {

 
  getAll: async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({ data: products });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },


  getById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ data: product });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },


  create: async (req, res) => {
    try {
      const url = req.protocol + '://' + req.get('host')
      const category = req.body.category;
      delete req.body.category; 
      req.body.category = [];
      req.body.category[0] = category;
      const newProduct = new Product(req.body);
      const image =  url + '/public/' + req.file.filename;
      newProduct.image = image;
      const savedProduct = await newProduct.save();

      const currentCat = await Category.findById(category);

      if (currentCat) {
        currentCat.products.push(newProduct._id); // OR use [...currentCat.products, productId]
        await currentCat.save();
      }
      res.status(201).json({ data: savedProduct });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Invalid product data', error: err.message });
    }
  },

  
  update: async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ data: updatedProduct });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Update failed', error: err.message });
    }
  },

  
  delete: async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Delete failed' });
    }
  },

  getByCatId: async (req, res) =>{
    try {
      const product = await Product.find({ category: { $in: [req.params.catid] } });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ data: product, success: true  });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

};

module.exports = Productcontroller;
