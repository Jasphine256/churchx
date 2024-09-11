import Project from "@models/Project";
import { connectToDb } from "@utils/database";

export async function GET(request){
try {
    //connecting to database
    await connectToDb()

    // fetching all data
    const projects = await Project.find()
    
    if (projects){
        return createResponse(projects, 200)
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