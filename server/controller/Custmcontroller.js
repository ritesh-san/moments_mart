const Customer = require('../models/Customer');
const bcryptjs = require('bcrypt');

const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

class Customcontroller{
     static allinfo=async (req,res)=>{
      try 
      {
          const result=await Customer.find({});
          res.status(200).json({data:result});
      }
      catch(err)
      {
        console.log(err);
      }
   }

   static registration=async (req,res)=>{
      try 
      {
          const {type, name, email, phone, password, street, city, country, postcode, companyName, idNo, businessType} = req.body;

          const checkEmail=await Customer.findOne({email:email});

          if(checkEmail?._id) {
              res.send({
                  success: false,
                  message: "This email ID is already exist."
              });
          }

          let salt = bcryptjs.genSaltSync(10);
          let enycpwd = bcryptjs.hashSync(password, salt);

          let customer = new Customer({type: type, name:name, password:enycpwd, email:email, phone:phone, address: `${street}, ${city}, ${country}, Zip - ${postcode}`});
          if(type == 'vendor') {
            customer.companyName = companyName;
            customer.idNo = idNo;
            customer.businessType = businessType;
          }
          
          let result = await customer.save();

          res.status(200).json({data:result, success: true});
      }
      catch(err)
      {
        console.log(err);
      }
   }

   static login=async (req,res)=>{
      try 
      {
         const {email , password} = req.body;

          let check1 = await Customer.findOne({email:email});

        if(check1)
        {
            let chek2 = await bcryptjs.compare(password, check1.password);
            if(chek2)
            {
                dotenv.config();
                const token_secret = process.env.TOKEN_SECRET;
                const token=jwt.sign({email:email},token_secret,{expiresIn: '1800s'});

                res.status(200).json({msg:'login success', success: true, token: token, data: check1});
            }
            else{
                res.status(400).json({msg:'Password Invalid', success: false});
            }
        }
        else{
            res.status(400).json({msg:'login failed', success: false});
        }
      }
      catch(err)
      {
        console.log(err);
      }
   }
}
module.exports=Customcontroller;