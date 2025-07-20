const express = require('express');
const Customer = require('../controller/Custmcontroller');
const Product =require('../controller/Productcontroller')
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


router.post("/create", Product.create);


router.put("/update/:id", Product.update);


router.delete("/delete/:id", Product.delete);


module.exports = router;

