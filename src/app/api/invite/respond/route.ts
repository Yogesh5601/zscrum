import dbConnect from "@/lib/dbconnect";
import { Invitation } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    console.log("********Respon accept reject called********")
  try {
    const { token, status } = await req.json();

    // Validate the input
    if (!token || !status) {
      return NextResponse.json({
        success: false,
        message: "Token and status are required",
      });
    }

    await dbConnect();

    // Find the invitation by token
    const invitation = await Invitation.findOne({ token });

    if (!invitation) {
      return NextResponse.json({
        success: false,
        message: "Invitation not found",
      });
    }

    // Update the invitation status
    invitation.status = status;
    await invitation.save();

    return NextResponse.json({
      success: true,
      message: `Invitation ${status}ed successfully`,
      result: invitation,
    });
  } catch (error) {
    console.error("Error responding to invitation:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Failed to respond to invitation",
    });
  }
}
