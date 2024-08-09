import connectDatabase from "@/databaseConnect/databaseConnect";
import User from "@/models/UserModels";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/GetDataFromToken";

connectDatabase();

export async function POST(request: NextRequest) {
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    return NextResponse.json(
      {
        error: "Invalid token",
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      message: "User Found",
      user,
      success: true,
    },
    { status: 200 }
  );
}
