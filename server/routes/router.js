const express = require('express');
const Customer = require('../controller/Custmcontroller');
const Product =require('../controller/Productcontroller');
const Categoryinfo = require('../controller/Categorycontroller');
const upload = require('../config/upload');
const router = express.Router();


router.get("/", (req, res) => {
  res.send("<h3>Customer Router Working </h3>");
});

//Customer
router.get("/custinfo", Customer.allinfo);
router.post("/register",Customer.registration);

router.post("/login",Customer.login);

//Product

router.get("/proinfo",Product.getAll);


router.get("/proinfo/:id", Product.getById);

router.get("/prolist/:catid", Product.getByCatId);

router.post("/create", upload.single('image'), Product.create);


router.put("/update/:id", Product.update);


router.delete("/delete/:id", Product.delete);

router.post("/category", Categoryinfo.add);

router.get("/categories", Categoryinfo.info);

router.get("/category/:id", Categoryinfo.infobyid);

module.exports = router;

