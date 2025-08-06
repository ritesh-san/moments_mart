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
          const {type, name, email, phone, password, street, city, state, country, postcode, companyName, idNo, businessType} = req.body;

          const checkEmail=await Customer.findOne({email:email});

          if(checkEmail?._id) {
              res.send({
                  success: false,
                  message: "This email ID is already exist."
              });
          }

          let salt = bcryptjs.genSaltSync(10);
          let enycpwd = bcryptjs.hashSync(password, salt);

          let customer = new Customer({
                  type: type, 
                  name:name, 
                  password:enycpwd, 
                  email:email, 
                  phone:phone, 
                  address: [{
                          street: street,
                          city: city,
                          state: state,
                          country: country,
                          postcode: postcode
                        }]
                    });
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

   static addresslist= async (req, res)=>{
      const {customerid} = req.params;

      let customerdata = await Customer.findById(customerid);

      if(customerdata?.address.length > 0)
        {
            
            res.status(200).json({success: true, data: customerdata?.address});
           
        }
        else{
            res.status(400).json({msg:'Recorde Not found', success: false});
        }
   }

   static getAddress= async (req, res)=>{
      const {customerid, addressid} = req.body;

      let customerdata = await Customer.findById(customerid);

      if(customerdata?.address.length > 0)
        {
            let address = customerdata.find((val,index)=>{
                return index == addressid;
            })
            res.status(200).json({success: true, data: address});
           
        }
        else{
            res.status(400).json({msg:'Recorde Not found', success: false});
        }
   }

   static addressUpdate= async (req, res)=>{
    console.log(req.body)
      const {street, city, state, country, postcode, customerid, addressid} = req.body;

      let customerdata = await Customer.findById(customerid);

      if(customerdata)
        {
            if(addressid != '')  {
              customerdata?.address.map((val,aid)=>{
                  if(aid == addressid) {
                    customerdata.address[aid] = {
                      street: street,
                      city: city,
                      state: state,
                      country: country,
                      postcode: postcode
                    }
                  }
              })
            } else {
              customerdata.address[parseInt(customerdata?.address.length > 0 ? customerdata?.address.length : 0)] = {
                      street: street,
                      city: city,
                      state: state,
                      country: country,
                      postcode: postcode
                    }
            }

            const updatedAddress = await Customer.findByIdAndUpdate(
              customerid,
              customerdata,
              { new: true, runValidators: true }
            );
            if (!updatedAddress) {
              return res.status(404).json({ message: 'address not add/update' });
            }
            res.status(200).json({success: true, data: updatedAddress});
           
        }
        else{
            res.status(400).json({msg:'Recorde Not found', success: false});
        }
   }
}
module.exports=Customcontroller;