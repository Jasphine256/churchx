import { readDocuments } from "@utils/database"

export async function GET(request){
    try {

        const payments = await readDocuments("Payments")
        
        if (payments){
            return createResponse(payments, 200)
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