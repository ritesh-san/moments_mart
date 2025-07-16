const Customer = require('../models/Customer');
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
}
module.exports=Customcontroller;