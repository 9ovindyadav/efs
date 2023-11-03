const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide name"],
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required: [true,"Please provide email"],
        unique:true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Provide valid email id"]
    },
    password:{
        type:String,
        required:[true,"Please provide password"],
        minlength:[6,"Password must be atleast 6 characters"]
    },
    role:{
        type: String,
        enum:["user","admin"],
        default: "user"
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: String
});

UserSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.comparePassword = async function(providedPass){
    const isMatch = await bcrypt.compare(providedPass, this.password);
    return isMatch ;
};

UserSchema.methods.createJWT = function(){
    return jwt.sign({userID: this._id, userName: this.name},process.env.JWT_SECRET,{expiresIn: "30d"});
};

UserSchema.methods.getResetPasswordToken = function(){

    const resetToken = crypto.randomBytes(20).toString("hex") ;

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 1000 * 60 * 15 ;
    
    return resetToken ;
}

module.exports = mongoose.model("User",UserSchema);