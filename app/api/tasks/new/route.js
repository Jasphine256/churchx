import { createDocument } from "@utils/database";

// Handler function for adding a new task
export async function POST(request) {
    try {
        // Extracting data from the request body

        const { creator, title, description, handler, startDate, deadline, status } = await request.json();

        const created = await createDocument("Tasks", {
            creator:creator,
            title:title,
            handler:handler,
            description:description,
            startDate:startDate,
            deadline:deadline,
            status:status
        })

        if (created){
            return createResponse("Task saved successfully", 201);
        }
        return createResponse("Error occurred", 500)

    } catch (error) {
        console.error("Error while adding task:", error);
        return createResponse("Failed to save task", 500);
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
