import dbConnect from "@/lib/dbconnect";
import { Invitation } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const landordEmail = req.nextUrl.searchParams.get("email");
    console.log(landordEmail, "land lord email");

    await dbConnect();
    const result = await Invitation.find({ landlordId: "6745b1697c7158c48b705b6e" }).populate('tenantId')

    console.log(result, "result for all tenants");
    return NextResponse.json({
      success: true,
      message: "fetched tenents successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message || "error in fetchin tenants",
    });
  }
}
