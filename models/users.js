import mongoose from "mongoose";

const userschema = mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    active:{type:Boolean},
    verificationcode:{type:Number},
    profilepicture:{type:String, default:"default.jpg"},
    DOB:{type:Date},
    userrole:{type:String, default:false},
    awardedspin:{type:Number},
    status:{type:Boolean},
    playmode:{type:String , default:"None"}
});

const userModel = mongoose.model('User',userschema);

export default userModel;