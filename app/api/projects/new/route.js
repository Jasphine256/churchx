import { createDocument } from "@utils/database";

export async function POST(request) {
    try {
        // Extract project data from the request body
        const { creator, name, description, handler, team, budget, startDate } = await request.json()

        await createDocument("Projects", {
            creator:creator,
            name:name,
            description:description,
            handler:handler,
            team:team,
            budget:budget,
            startDate:startDate,
        })
        return createResponse("Project saved successfully", 201);
    } catch (error) {
        console.error("Error saving project:", error);
        return createResponse("Failed to save project", 500);
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
