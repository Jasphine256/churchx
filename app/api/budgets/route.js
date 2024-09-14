import { readDocuments } from "@utils/database";
import { readDocumentByField } from "@utils/database";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        const user = searchParams.get("user");  // Get the 'user' query parameter

        const budgets = await readDocumentByField("Budgets", 'creator', user)

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
