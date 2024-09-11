import Task from "@models/Task";
import { connectToDb } from "@utils/database";

export async function GET(request){
try {
    //connecting to database
    await connectToDb()

    // fetching all data
    const tasks = await Task.find()
    
    if (tasks){
        return createResponse(tasks, 200)
    }else{
        return createResponse("Not Found", 404)
    }
    
} catch (error) {
    return createResponse("An error occurred", 500)
    console.log("An error occurred")

}
}

function createResponse(message, status) {
    return new Response(
        JSON.stringify({ message }),
        { status }
    );
}