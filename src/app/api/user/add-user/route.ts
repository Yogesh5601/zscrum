import dbConnect from "@/lib/dbconnect";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("[API] Update User Endpoint Called");

  try {
    // Parse the incoming request body
    const body = await req.json();
    console.log(body)
    const { email, updatedField } = body;

    // Validate input
    if (!email || !updatedField) {
      return NextResponse.json(
        { success: false, message: "Email and updatedField are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find the user and update the provided field
    const updatedUser = await User.findOneAndUpdate(
      { email }, 
      { $set: updatedField }, 
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 } // Not Found
      );
    }

    console.log("[API] User Updated:", updatedUser);

    // Return success response
    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("[API] Error updating user:", error);

    return NextResponse.json(
      { success: false, message: error.message || "An error occurred" },
      { status: 500 } // Internal Server Error
    );
  }
}
