import { readDocumentByField } from "@utils/database"

export async function GET(request){
    try {
    
        const { searchParams } = new URL(request.url);

        const user = searchParams.get("user");  // Get the 'user' query parameter

        const projects = await readDocumentByField("Projects", 'creator', user)        
        if (projects){
            return createResponse(projects, 200)
        }else{
            return createResponse("Not Found", 404)
        }
        
    } catch (error) {
        return createResponse("An error occurred", 500)

    }
}

function createResponse(message, status) {
    return new Response(
        JSON.stringify({ message }),
        { status }
    );
}