import { connectToDb } from "@utils/database";
import Payment from "@models/Payment";

export async function POST(request) {
    try {
        // Extract payment data from the request body
        const paymentData = await request.json()
        const { creator, type, reason } = paymentData;

        // Connect to the database
        await connectToDb();

        // Check if the payment already exists
        const paymentExists = await Payment.findOne({ creator, type, reason });

        if (paymentExists) {
            return createResponse(response, "Payment already made", 200);
        }

        // Create and save the new payment entry
        const newPayment = new Payment(paymentData);
        await newPayment.save();

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

