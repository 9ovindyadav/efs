const { customErrors } = require("../errors/custom-errors");

const errorHandlerMiddleware = (err,req,res,next) => {
   const customError = {
      statusCode: err.statusCode || 500,
      msg: err.message || "Something went wrong"
   }
   if(err.code === 11000){
      customError.statusCode = 400;
      customError.msg = `Duplicate value enterd for ${Object.keys(err.keyValue)} field, Please choose another value`
   }
   if(err.name === "ValidationError"){
      customError.statusCode = 400 ;
      customError.msg = `Please provide ${Object.keys(err.errors).join(",")}` ;
   }
   // res.status(500).json({err});
   return res.status(customError.statusCode).json({msg: customError.msg});
}

module.exports = errorHandlerMiddleware ;