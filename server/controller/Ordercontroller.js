const OrderModel = require('../models/Order');
const CustomerModel = require('../models/Customer');
const CartModel = require('../models/Cart');

const Order = {
    addOrder: async (req, res)=>{
        
        let cart = CartModel.findById(req.body.cart_id);
        const timestamp = Date.now(); // e.g., 1722055657745
        const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random
        let orderNumber = `ORD${timestamp}${random}`;
        req.body.order_number = orderNumber
      
        let newOrder = new OrderModel(req.body)
        result = await newOrder.save();

        const updatedFields = {
            order_id: result._id,
            status: "inactive"
        };

        const updatedProduct = await CartModel.findByIdAndUpdate(
            req.body.cart_id,
            { $set: updatedFields },
            { new: true, runValidators: true }
        );
        

        res.status(200).json({ data: result, success: true });
    },
    getOrder: async (req, res)=>{
        const result = await OrderModel.findById(req.params.id)

        res.status(200).json({ data: result, success: true });
    }
}

module.exports = Order