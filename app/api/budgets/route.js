import { readDocuments } from "@utils/database";

export async function GET(request) {
    try {
        const budgets = await readDocuments("Budgets")

        if (budgets) {
            return createResponse(budgets, 200);
        } else {
            return createResponse("Not Found", 404);
        }
        
    } catch (error) {
        console.error("An error occurred:", error);
        return createResponse("An error occurred", 500);
    }
}

function createResponse(message, status) {
    return new Response(
        JSON.stringify({ message }),
        { status }
    );
}
