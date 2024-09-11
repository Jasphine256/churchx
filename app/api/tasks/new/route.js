import { connectToDb } from "@utils/database";
import Task from "@models/Task";

// Handler function for adding a new task
export async function POST(request) {
    try {
        // Extracting data from the request body
        const taskData = await request.json();
        const { creator, title } = taskData;

        // Connect to the database
        await connectToDb();

        // Check if the task already exists
        const taskExists = await Task.findOne({ title, creator });

        if (taskExists) {
            return createResponse("Task already exists", 200);
        }

        // Create and save the new task
        const newTask = new Task(taskData);
        await newTask.save();

        return createResponse("Task saved successfully", 201);
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
