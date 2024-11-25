import dbConnect from "@/lib/dbconnect";
import { User } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    console.log("update role api called")
  try {
    const userData = await req.json();
    console.log(userData, "user data i get in update api");
    const { email, role } = userData;
    await dbConnect();

    const user = await User.findOneAndUpdate(
      { email },
      { role, isProfileComplete: true },
      { new: true }
    );

    console.log("user updated", user);

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    return NextResponse.json({ success: true, message: "Profile completed!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
