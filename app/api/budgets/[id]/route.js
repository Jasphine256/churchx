import { readDocumentById } from "@utils/database"

export async function GET(request, {params}){
    const {id} = params
try {
   
    const budget = await readDocumentById("Budgets", id)
    
    if (budget){
        return createResponse(budget, 200)
    }
    return createResponse("Not Found", 404)
    
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