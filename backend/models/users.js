import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true,
        unique:true
    },
    password: {
        type: String,
        required : false
    },
    provider:{
        type:String,
        enum:['local','google'],
        default:'local'
    },
    googleId:{
        type:String
    },
},{minimize:false})

const UserModel = mongoose.model.user || mongoose.model('userdatas',userSchema);
export default UserModel;
