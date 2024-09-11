import Visitor from "@models/Visitor";
import { connectToDb } from "@utils/database";

export async function GET(request){
try {
    //connecting to database
    await connectToDb()

    // fetching all data
    const visitors = await Visitor.find()
    
    if (visitors){
        createResponse(visitors, 200)
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