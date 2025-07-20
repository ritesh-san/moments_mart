const express = require('express');
const Customer=require('../controller/Custmcontroller');
const router=express.Router();
router.get("/",(req,res)=>{
    res.send("<h3>Customer router</h3>");
})
router.get("/info",Customer.allinfo);

router.post("/register",Customer.registration);

router.post("/login",Customer.login);

module.exports=router;