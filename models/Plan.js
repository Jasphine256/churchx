import mongoose from "mongoose"

const PlanSchema = mongoose.Schema({
    creator:{
        type:String,
        required:true,
    },
    name:{
        type:String, 
        required:true,
    },
    description:{
        type:String, 
        required:true,
    },
    handler:{
        type:String, 
        required:true,
    },
    budget:{
        type:String, 
        required:true,
    },
    status:{
        type:String, 
        required:true,
    },
})

export default mongoose.models.Plan || mongoose.model('Plan', PlanSchema)