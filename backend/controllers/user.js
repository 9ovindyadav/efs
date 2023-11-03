const User = require("../models/user");
const {BadRequestError, UnAuthorizedError, NotFoundError, customErrors} = require("../errors/custom-errors");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const userRegister = async (req,res) => {
    const user = await User.create({...req.body});
    const token = user.createJWT() ;
     res.status(200).json({
       message: `Welcome ${user.name}`,
       token
     })
}

const userLogin = async (req,res) => {
    const {email, password} = req.body ;
    
    if(!email || !password){
        throw new BadRequestError("Please provide email and password");
    }
    const user = await User.findOne({email});

    if(!user){
        throw new UnAuthorizedError("Invalid credentials");
    }

    const isCorrectPassword = await user.comparePassword(password);

    if(!isCorrectPassword){
        throw new UnAuthorizedError("Invalid credentials")
    }

    user.password = null ;
    const token = user.createJWT() ;
    res.status(200).json({
        message: `Welcome back ${user.name}`,
        token
      })
}

const forgotPassword = async (req,res) => {
    const {email} = req.body ;
    if(!email){
        throw new BadRequestError("Please provide email");
    }
    const user = await User.findOne({email});

    if(!user){
        throw new NotFoundError("User not found")
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `Your reset password token is : \n\n${resetPasswordUrl}\n\n If you have not requested this email, Please ignore it.`

    await sendEmail({email,subject:"Password Recovery",message});

    res.status(200).json({
        message:`Email sent to ${user.email} successfully`
    })

}

const resetPassword = async (req,res) => {

const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

const user = await User.findOne({resetPasswordToken,resetPasswordExpire: {$gt: Date.now()}});

if(!user) throw new BadRequestError("Reset password token is invalid or has been expired");

user.password = req.body.password ;
user.resetPasswordToken = undefined;
user.resetPasswordExpire = undefined;

await user.save();

    res.status(200).json({
        message: "Password reset successful"
    })
}

const getUser = async (req,res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({message:`Welcome ${user.name}`, user});
}

module.exports = {
    userRegister,
    userLogin,
    forgotPassword,
    resetPassword,
    getUser
}