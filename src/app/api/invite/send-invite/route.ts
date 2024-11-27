import dbConnect from "@/lib/dbconnect";
import { Invitation } from "@/models";
import { sendMail } from "@/utils/sendMail";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("**********send invitation api called*********");
  try {
    const { landlordId, tenantEmail } = await req.json();
    console.log(
      "initation details:",
      landlordId,
      tenantEmail
    );

    await dbConnect();

    // Generate unique token
    const token = crypto.randomBytes(32).toString("hex");
    console.log(token, "token");

    // Send email with invitation link
    const invitationLink = `${process.env.NEXT_PUBLIC_URL}/invitation?token=${token}`;
    const subject = "Rental Invitation";
    const invitation = `You have been invited to connect by a landlord. Click the link to respond: ${invitationLink}`;

    const emailSend = await sendMail(subject, tenantEmail, invitation);
    console.log(emailSend, "email send");
    if (!emailSend) {
      return NextResponse.json({
        success: false,
        message: "error in sending email",
      });
    }

    // Save invitation in the database
    const savedInvitation = await Invitation.create({
      landlordId,
      tenantEmail,
      // propertyDetails,
      token,
      status: "Pending",
      createdAt: new Date(),
    });
    console.log("savedInvitation:", savedInvitation);

    return NextResponse.json(
      { success: true, message: "Invitation sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || "failed to send invitation",
    });
  }
}
