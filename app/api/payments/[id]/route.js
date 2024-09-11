import Payment from "@models/Payment";
import { connectToDb } from "@utils/database";

export async function GET(request){
    const {id} = request.query
try {
    //connecting to database
    await connectToDb()

    // fetching all data
    const payment = Payment.findOne({id})
    
    if (payment){
        createResponse(payment, 200)
    }else{
        createResponse("Not Found", 404)
    }
    
} catch (error) {
    createResponse("An error occurred", 500)
    console.log("An error occurred")

}
}

function createResponse(message, status) {
    return new Response(
        JSON.stringify({ message }),
        { status }
    );
}