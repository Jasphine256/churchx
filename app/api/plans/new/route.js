import { connectToDb } from "@utils/database";
import Plan from "@models/Plan";

export async function POST(request) {
    try {
        // Extract plan data from the request body
        const planData = await request.json()
        const { creator, name} = planData;

        // Connect to the database
        await connectToDb();

        // Check if the plan already exists
        const planExists = await Plan.findOne({ creator, name });

        if (planExists) {
            return createResponse("Plan already exists", 200);
        }

        // Create and save the new plan entry
        const newPlan = new Plan(planData);
        await newPlan.save();

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
