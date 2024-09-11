import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'please provide fullname']
    },
    email:{
        type:String,
        unique:true,
        match:[/.+\@.+\..+/, 'email is invalid' ],
        required:[true, 'please provide email']
    },
    image:{
        type: String,
        required:false
    }
})

export default mongoose.models.User || mongoose.model('User', UserSchema)