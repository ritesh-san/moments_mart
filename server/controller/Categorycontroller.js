const Category = require('../models/Category')

const Category= {

    add: async (req, res)=>{
        const {name, description, is_show} = req.body

        let customer = new Customer({name: name, description: description, is_show: is_show})

        let result = await customer.save();

        res.status(200).json({data:result, success: true});

    }
}

module.exports=Category;