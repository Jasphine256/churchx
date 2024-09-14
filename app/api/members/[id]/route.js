import { readDocumentById } from "@utils/database"

export async function GET(request, {params}){
    const {id} = params
try {
    
    const member = await readDocumentById("Members", id)
    
    if (member){
        return createResponse(member, 200)
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