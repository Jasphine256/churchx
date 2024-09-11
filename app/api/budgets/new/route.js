import { connectToDb } from "@utils/database";
import Budget from "@models/Budget";

export async function POST(request) {
    try {
        // Extract the budget data from the request body
        const budgetData =  await request.json();
        const {creator, handler, name} = budgetData

        // Connect to the database
        await connectToDb();

        // Check if the budget already exists
        const budgetExists = await Budget.findOne({ creator, handler, name });

        if (budgetExists) {
            return createResponse("Budget already exists!", 200);
        }

        // Create and save the new budget entry
        const newBudget = new Budget(budgetData);
        await newBudget.save();

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
