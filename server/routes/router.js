const express = require('express');
const Customer = require('../controller/Custmcontroller');
const Product =require('../controller/Productcontroller');
const Categoryinfo = require('../controller/Categorycontroller');
const Cart = require('../controller/Cartcontroller');
const upload = require('../config/upload');
const order = require('../controller/Ordercontroller');
const router = express.Router();


router.get("/", (req, res) => {
  res.send("<h3>Customer Router Working </h3>");
});

//Customer
router.get("/custinfo", Customer.allinfo);
router.post("/register",Customer.registration);

router.post("/login",Customer.login);

router.post("/changepass",Customer.ChangePassword);

router.post("/address/", Customer.addressUpdate);

router.get("/address/:customerid/:addressid", Customer.getAddress);

router.get("/address/:customerid", Customer.addresslist);

router.delete("/address/:customerid/:addressid", Customer.addressDelete);

//Product

router.get("/proinfo",Product.getAll);

router.get("/prosearch",Product.getSearch);

router.get("/proinfo/:id", Product.getById);

router.get("/prolist/:catid", Product.getByCatId);

router.post("/create", upload.single('image'), Product.create);


router.put("/update/:id", Product.update);


router.delete("/delete/:id", Product.delete);

router.post("/category", Categoryinfo.add);

router.get("/categories", Categoryinfo.info);

router.get("/category/:id", Categoryinfo.infobyid);

//Cart
router.post("/cart/:custid", Cart.addcart);

router.put("/cartadditem", Cart.additem);

router.put("/cartupdateqty", Cart.updateQty);

router.post("/order", order.addOrder);

router.get("/order/:customerid", order.getOrders);

router.get("/orderinfo/:id", order.getOrder);

module.exports = router;

