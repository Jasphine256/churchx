import { readDocumentById } from "@utils/database"

export async function GET(request){
    const {id} = request.query
try {
    
    const plan = await readDocumentById(id)
    
    if (plan){
        createResponse(plan, 200)
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