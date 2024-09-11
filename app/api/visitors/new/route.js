import { connectToDb } from "@utils/database";
import Visitor from "@models/Visitor";

export async function POST (request) {
    try {
        // Extract member data from the request body
        const visitorData = await request.json()
        const { creator, name, contact} = visitorData;

        // Connect to the database
        await connectToDb();

        // Check if the member already exists
        const visitorExists = await Visitor.findOne({ creator, contact, name });

        if (visitorExists) {
            return createResponse("Member already exists", 200);
        }

        // Create and save the new member entry
        const newVisitor = new Visitor(visitorData);
        await newVisitor.save();

        return createResponse("Visitor saved to database", 201);
    } catch (error) {
        console.error("Error saving member:", error);
        return createResponse("Failed to save visitor", 500);
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
