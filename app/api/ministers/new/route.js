import { createDocument } from "@utils/database";

export async function POST(request) {
    try {
        // Extract minister data from the request body
        const { creator, name, role, ministry, contact, email} = await request.json()

        await createDocument("Ministers", {
            creator:creator,
            name:name,
            role:role,
            ministry:ministry,
            contact:contact,
            email:email,
        })
        return createResponse("Minister saved successfully", 201);
    } catch (error) {
        console.error("Error saving minister:", error);
        return createResponse("Failed to save minister", 500);
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
