const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { BadRequestError, UnAuthorizedError } = require("../errors/custom-errors");

const authorizationMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization ;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new BadRequestError("No token provided")
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {userID,userName} = decoded ;
        const user = await User.findById(userID).select("-password");
        req.user = user ;
        next();
    } catch (error) {
        throw new UnAuthorizedError("Not authorized to access this route")
    }
}

const authorizedAdmin = (req,res,next) => {
          if(!req.user.role === "admin"){
            throw new UnAuthorizedError("Not authorized to access this route");
          }
      next();
}

module.exports = {
    authorizationMiddleware,
    authorizedAdmin
} ;