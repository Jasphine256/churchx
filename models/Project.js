import mongoose from "mongoose"

const ProjectSchema = mongoose.Schema({
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
    team:{
        type:String,
        required:true,
    },
    budget:{
        type:String,
        required:true,
    },
    startDate:{
        type:String,
        required:true,
    },
})

export default mongoose.models.Project || mongoose.model('project', ProjectSchema)
