import { connectToDb } from "@utils/database";
import Project from "@models/Project";

export async function POST(request) {
    try {
        // Ensure the method is POST
        if (request.method !== 'POST') {
            return createResponse(response, "Method not allowed", 405);
        }

        // Extract project data from the request body
        const projectData = await request.json()
        const { creator, name } = projectData;

        // Connect to the database
        await connectToDb();

        // Check if the project already exists
        const projectExists = await Project.findOne({ creator, name });

        if (projectExists) {
            return createResponse("Project already exists", 200);
        }

        // Create and save the new project entry
        const newProject = new Project(projectData);
        await newProject.save();

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
