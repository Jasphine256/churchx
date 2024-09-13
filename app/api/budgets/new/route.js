import { createDocument } from "@utils/database";

export async function POST(request) {
    try {
        // Extract the budget data from the request body
        const {creator, name, description, handler, total, status} = await request.json();

        await createDocument("Budgets", {
            creator:creator,
            name:name,
            description:description,
            handler:handler,
            total:total,
            status:status
        })

        return createResponse("Budget saved successfully!", 201);
    } catch (error) {
        console.error("Error adding budget:", error);
        return createResponse("Failed to save budget", 500, error.message);
    }
}

// Utility function to create a response
function createResponse(message, status) {
    return new Response(
        JSON.stringify({ message }),
        { status }
    );
}

// Optional handler for unsupported methods
export async function GET(request) {
    return createResponse("GET method not supported", 405);
}
