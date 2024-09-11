import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    creator:{
        type:String, 
        required:true,
    },
    title:{
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
    startDate:{
        type:String, 
        required:true,
    },
    deadline:{
        type:String, 
        required:true,
    },
})

export default mongoose.models.Task || mongoose.model('Task', TaskSchema)
