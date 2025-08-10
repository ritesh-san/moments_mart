const CartModel = require('../models/Cart');
const CustomerModel = require('../models/Customer');
const ProductModel = require('../models/Product');

const Cart = {
    addcart: async (req, res)=>{
        let result =  await CartModel.findOne({customer_id: req.params.custid, status: 'active'});
        
        if(!result) {
            let customer =  await CustomerModel.findById(req.params.custid);

            const timestamp = Date.now(); // e.g., 1722055657745
            const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random
            let cartNumber = `CART${timestamp}${random}`;
            let activCart = new CartModel({
                cart_number: cartNumber,
                status: 'active',
                customer_id: req.params.custid,
                customer_email: customer.email,
                customer_name: customer.name,
                shipping_amount: 0,
                tax: 0               
            })
         result = await activCart.save();
        }

        res.status(200).json({ data: result, success: true });
    },
    additem: async (req, res)=>{
        const activCart =  await CartModel.findById(req.body.cartid);
        const proId = req.body.proid
        const qty = req.body.qty

        
        const oldItems = activCart.items;
        let update = false;
        let subtotal = 0;
        oldItems.map((olditem,index)=>{
            if(olditem.proid == proId)
            {
                oldItems[index].qty += parseInt(qty);
                oldItems[index].subtotal = parseFloat(olditem.price)*parseInt(olditem.qty);
                update = true;
            }

            subtotal +=  oldItems[index].subtotal;
        })
        if(!update) {
            const product =  await ProductModel.findById(proId);
            if(oldItems) {
                oldItems.push({
                    id:parseInt(oldItems.length)+1, 
                    proid: proId, 
                    name: product.productName, 
                    sku: product.productSKU, 
                    qty: parseInt(qty),
                    price: product.price,
                    subtotal: parseFloat(product.price)*parseInt(qty),
                    image: product.image
                })

                subtotal +=  parseFloat(product.price)*parseInt(qty);
            }
        }
        activCart.subtotal = subtotal;
        activCart.total = subtotal;
        activCart.shipping_ammount = activCart.shipping_ammount ? activCart.shipping_ammount : 0;
        activCart.tax = activCart.tax ? activCart.tax : 0;
        const result = await CartModel.findByIdAndUpdate(
                req.body.cartid,
                activCart,
                { new: true, runValidators: true }
              );

        res.status(200).json({ data: result, success: true });
    },
    updateQty: async (req, res) => {
        const {cartid, itemid, qty, action} = req.body

        const activCart =  await CartModel.findById(cartid);

        if(activCart) {
            if(activCart?.items.length > 0) {

                activCart.items.map((item, ind)=>{
                    if(item.id == itemid) {
                        if(action == 'plus') {
                           activCart.items[ind].qty += qty
                           activCart.items[ind].subtotal += qty * activCart.items[ind].price
                            activCart.subtotal += qty * activCart.items[ind].price
                            activCart.total += qty * activCart.items[ind].price
                        } else {
                             if(item.qty == 1)
                             {
                                let newitems = activCart.items.filter((nitem)=>{
                                    if(nitem.id == itemid) {
                                        activCart.subtotal -= nitem.subtotal
                                        activCart.total -= nitem.subtotal
                                    }
                                    return nitem.id != itemid
                                })
                                activCart.items = newitems
                             } else {
                                activCart.items[ind].qty -= qty
                                activCart.items[ind].subtotal -= qty * activCart.items[ind].price
                                activCart.subtotal -= qty * activCart.items[ind].price
                                activCart.total -= qty * activCart.items[ind].price
                             }
                        }
                        
                    }
                    
                })
            }

            const updatedCart = await CartModel.findByIdAndUpdate(
              cartid,
              activCart,
              { new: true, runValidators: true }
            );
            if (!updatedCart) {
              return res.status(404).json({ message: 'Item not deleted' });
            }
            res.status(200).json({success: true, data: updatedCart});

        } else {
            res.status(401).json({ msg: 'Records not found', success: false });
        }
    }
}

module.exports = Cart