import dbConnect from "@/lib/dbconnect";
import { Invitation } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
console.log("*******get token and tokens api called********")
  try {
    const token = req.nextUrl.searchParams.get("token");
    console.log(token)
    await dbConnect();

    if (token) {
      // Fetch a single invitation by token
      const invitation = await Invitation.findOne({ token }).populate(
        "landlordId",
        "name email -_id"
      );

      if (!invitation) {
        return NextResponse.json({
          success: false,
          message: "Invitation not found",
        });
      }console.log(invitation, "invitation");

      return NextResponse.json({
        success: true,
        result: invitation,
      });
    } else {
      // Fetch all invitations
      const invitations = await Invitation.find().populate(
        "landlordId",
        "name email -_id"
      );

      console.log(invitations,"invitations")
      return NextResponse.json({
        success: true,
        result: invitations,
      });
    }
  } catch (error) {
    console.error("Error fetching invitations:", error);
    return NextResponse.json({
      success: false,
      message: "Error fetching invitations",
    });
  }
}
