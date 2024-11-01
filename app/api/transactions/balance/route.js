import { updateDocumentByEmail } from "@utils/database";

export async function POST(request){
    try {

        const { docid, value } = await request.json()
        
        let data = await updateDocumentByEmail("Balance", docid, {amount: value})
        if (!data){
            return createResponse("no data", 404)
        }
        return createResponse(data, 200)
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