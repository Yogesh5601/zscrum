import dbConnect from "@/lib/dbconnect";
import { Invitation } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("********Response accept/reject called********");

  try {
    const { tenantId, token, status } = await req.json();
    console.log(tenantId, "tenant id");

    // Validate the input
    if (!token || !status) {
      return NextResponse.json({
        success: false,
        message: "Token and status are required",
      });
    }

    if (status === "Accepted" && !tenantId) {
      return NextResponse.json({
        success: false,
        message: "Tenant ID is required when accepting an invitation",
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

    // Update the status and add tenantId if status is "Accepted"
    invitation.status = status;

    if (status === "Accepted" && tenantId) {
      invitation.tenantId = tenantId; // Add tenantId when status is Accepted
    }

    // Save the updated document (this adds the new field to the document)
    await invitation.save();

    return NextResponse.json({
      success: true,
      message: `Invitation ${status.toLowerCase()}ed successfully`,
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
