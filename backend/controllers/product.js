const Product = require("../models/product");
const cloudinary = require("../utils/cloudinary");

const createProduct = async (req,res) => {
    
    let Images = req.body.images ;

    const imagesLinks = [] ;
    if(Array.isArray(Images)){
        for(let i=0; i < Images.length ; i++){

            const result = await cloudinary.uploader.upload(Images[i],{
                folder:"products"
            });
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            });

        }
    }

    
    req.body.images = imagesLinks ;
    req.body.createdBy = req.user._id ;

    const product = await Product.create(req.body);

    res.status(200).json({message:"Product Added Successfully",product});
}

const getAllProducts = async (req,res) => {

    const {name, company, sort, fields, numericFilters} = req.query ;

    const newObj = {} ;

    if(company){
        newObj.company = company ;
    }
    if(name){
        newObj.name = { $regex: name, $options: "i" }
    }
    if(numericFilters){
        const operatorMap = {
            ">":"$gt",
            ">=":"$gte",
            "=":"$eq",
            "<":"$lt",
            "<=":"$lte",
        }
        const regEx = /\b(>|>=|=|<|<=)\b/g ;

        let filters = numericFilters.replace(regEx, (match)=>`-${operatorMap[match]}-`)

        const options = ["price","ratings"];

        filters = filters.split(",").forEach((item) => {
            const [field,operator,value] = item.split("-");
            if(options.includes(field)){
                newObj[field] = {[operator]: Number(value)}
            }
        })
    }

    let result = Product.find(newObj) ;

    //sort
    if(sort){
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    }else{
        result = result.sort("createdAt");
    }

    //fields
    if(fields){
        const fieldList = fields.split(",").join(" ");
        result = result.select(fieldList);
    }

    const page = req.query.page || 1 ;
    const limit = req.query.limit || 20 ;
    const skip = (page-1)*limit ;

    result = result.skip(skip).limit(limit);

    const products = await result ;
    
    res.status(200).json({nHits: products.length, products});
}

module.exports = {
    createProduct,
    getAllProducts
}