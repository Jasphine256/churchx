import { connectToDb } from "@utils/database";
import Member from "@models/Member";

export async function POST (request) {
    try {
        // Extract member data from the request body
        const memberData = await request.json()
        const { creator, name, contact} = memberData;

        // Connect to the database
        await connectToDb();

        // Check if the member already exists
        const memberExists = await Member.findOne({ creator, contact, name });

        if (memberExists) {
            return createResponse("Member already exists", 200);
        }

        // Create and save the new member entry
        const newMember = new Member(memberData);
        await newMember.save();

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
