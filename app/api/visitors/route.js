import { readDocumentByField } from "@utils/database"

export async function GET(request){
try {
  
    const { searchParams } = new URL(request.url);

    const user = searchParams.get("user");  // Get the 'user' query parameter

    const visitors = await readDocumentByField("Visitors", 'creator', user)

    if (visitors){
        return createResponse(visitors, 200)
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