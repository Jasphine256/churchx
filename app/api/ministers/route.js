import { readDocuments } from "@utils/database"

export async function GET(request){
    try {
        // fetching all data
        const ministers = await readDocuments("Ministers")
        
        if (ministers){
            return createResponse(ministers, 200)
        }else{
            return createResponse("Not Found", 404)
        }

    } catch (error) {
        console.log("An error occurred")
        return createResponse("An error occurred", 500)
    }
}

function createResponse(message, status) {
    return new Response(
        JSON.stringify({ message }),
        { status }
    );
}