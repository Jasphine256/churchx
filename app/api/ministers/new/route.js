import { connectToDb } from "@utils/database";
import Minister from "@models/Minister";

export async function POST(request) {
    try {
        // Extract minister data from the request body
        const ministerData = await request.json()
        const { creator, name, contact} = ministerData;

        // Connect to the database
        await connectToDb();

        // Check if the minister already exists
        const ministerExists = await Minister.findOne({ creator, contact, name });

        if (ministerExists) {
            return createResponse("Minister already exists", 200);
        }

        // Create and save the new minister entry
        const newMinister = new Minister(ministerData);
        await newMinister.save();

        return createResponse("Minister saved successfully", 201, newMinister);
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
