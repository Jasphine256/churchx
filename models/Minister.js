import mongoose from "mongoose"

const MinisterSchema = mongoose.Schema({
    creator:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    ministry:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
})

export default mongoose.models.Minister || mongoose.model('Minister', MinisterSchema)