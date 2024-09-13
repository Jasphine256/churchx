import { readDocuments } from "@utils/database"

export async function GET(request){
try {
    const members = await readDocuments("Members")

    if (members){
        return createResponse(members, 200)
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