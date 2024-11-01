import { readDocumentByField } from "@utils/database";

export async function GET(request){
    try {

        const { searchParams } = new URL(request.url);

        const user = searchParams.get("user");  // Get the 'user' query parameter
        const transactionType = searchParams.get("transactionType")  // Get the 'transactionType' query parameter

        if (transactionType == "payments"){
            let data = await readDocumentByField("Payments", 'creator', user)
            if (!data){
                return createResponse("no data", 404)
            }
            return createResponse(data, 200)
        }else if (transactionType == "funds"){
            let data = await readDocumentByField("Funds", 'creator', user)
            if (!data){
                return createResponse("no data", 404)
            }
            return createResponse(data, 200)
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