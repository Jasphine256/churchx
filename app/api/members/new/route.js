import { createDocument } from "@utils/database";

export async function POST (request) {
    try {
        // Extract member data from the request body
        const { creator, name, address, contact, email } = await request.json();

        await createDocument("Members", {
            creator:creator,
            name:name,
            address:address,
            contact:contact,
            email:email,
        })

        return createResponse("Member saved to database", 201);
    } catch (error) {
        console.error("Error saving member:", error);
        return createResponse("Failed to save member", 500);
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
