import mongoose from "mongoose"

const paymentSchema = mongoose.Schema({
    type:{
        type:String, 
        required:true,
    },
    name:{
        type:String, 
        required:true,
    },
    date:{type:String, 
        required:true,
    },
    reason:{
        type:String, 
        required:true,
    },
    amount:{
        type:String, 
        required:true,
    },
})

export default mongoose.models.Payment || mongoose.model("Payment", paymentSchema)