const CategoryModel = require('../models/Category')

const Category= {

    add: async (req, res)=>{
        const {name, description, is_show} = req.body

        let category = new CategoryModel({name: name, description: description, is_show: is_show})

        let result = await category.save();

        res.status(200).json({data:result, success: true});

    },
    info: async (req,res)=>{
        const category = await CategoryModel.find({});

        res.status(200).json({data:category, success: true});
    },
    infobyid: async (req,res)=>{
        
        const category = await CategoryModel.findById(req.params.id);

        res.status(200).json({data:category, success: true});
    }
}

module.exports=Category;