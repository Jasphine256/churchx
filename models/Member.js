import mongoose from "mongoose"

const memberSchema = mongoose.Schema({
    creator:{
        type:String, 
        required:true,
    },
    name:{
        type:String, 
        required:true,
    },
    email:{
        type:String, 
        required:true,
    },
    contact:{
        type:String, 
        required:true,
    },
    address:{
        type:String, 
        required:true,
    },
})

export default mongoose.models.Member || mongoose.model("Member", memberSchema)