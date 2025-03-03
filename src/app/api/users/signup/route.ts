import connectDatabase from "@/databaseConnect/databaseConnect";
import User from "@/models/UserModels";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

connectDatabase();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // send email verification
    await sendMail({
      email: email,
      emailType: "verify",
      userId: savedUser._id,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: savedUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
