import dbConnect from "@/lib/dbconnect";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("get user api called");
  try {
    // Parse the incoming request body
    const body = await req.json();
    const { email } = body.email;

    if(!email){
      return NextResponse.json({success:false, message:"please provide required details"})
    }

    await dbConnect();

    // Check if the user already exists
    const user = await User.findOne({ email }).select(
      "-_id -createdAt -updatedAt -__v -isProfileComplete -image"
    );

    // Return success response
    return NextResponse.json({
      result: user,
      success: true,
      message: "User getted successfully",
    });
  } catch (error: any) {
    console.error("Error adding user:", error); // Log error for debugging

    // Return error response
    return NextResponse.json(
      { success: false, message: error.message || "An error occurred" },
      { status: 500 } // Internal server error
    );
  }
}
