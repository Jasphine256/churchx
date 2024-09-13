import { createDocument } from "@utils/database";

export async function POST(request) {
    try {
        // Extract plan data from the request body
        const { creator, name, description, handler, budget, status} = await request.json()

        await createDocument("Plans", {
            creator:creator,
            name:name,
            description:description,
            handler:handler,
            budget:budget,
            status:status,
        })

        return createResponse("Plan saved successfully", 201);
    } catch (error) {
        console.error("Error saving plan:", error);
        return createResponse("Failed to save plan", 500);
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
