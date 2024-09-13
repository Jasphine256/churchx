import { createDocument } from "@utils/database";

export async function POST(request) {
    try {
        // Extract payment data from the request body
        const { creator, type, reason, name, amount, date } = await request.json()

        await createDocument("Payments", {
            creator:creator,
            type:type,
            name:name,
            date:date,
            reason:reason,
            amount:amount,
        })
        return createResponse(response, "Payment made successfully", 201);
    } catch (error) {
        console.error("Error making payment:", error);
        return createResponse(response, "Failed to make payment", 500);
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

