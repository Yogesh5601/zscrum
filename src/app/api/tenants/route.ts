import dbConnect from "@/lib/dbconnect";
import { Invitation } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const _id = req.nextUrl.searchParams.get("_id");
    console.log(_id, "land lord email");

    await dbConnect();
    const result = await Invitation.find({  }).populate('tenantId')

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
