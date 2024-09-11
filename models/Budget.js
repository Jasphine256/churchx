import mongoose from "mongoose";

const budgetSchema = mongoose.Schema({
    creator:{
        type:String, 
        required:true
    },
    name:{
        type:String, 
        required:true
    },
    description:{
        type:String, 
        required:true
    },
    handler:{
        type:String, 
        required:true
    },
    total:{
        type:String, 
        required:true
    },
    status:{
        type:String, 
        required:true
    },
})

export default mongoose.models.Budget || mongoose.model("Budget", budgetSchema)