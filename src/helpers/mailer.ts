import User from "@/models/UserModels";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }: any) => {
  console.log(userId);
  console.log(emailType);
  console.log(email);

  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "verify") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000, // 1 hour
        },
      });
    } else if (emailType === "reset") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgetPasswordToken: hashedToken,
          forgetPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
        },
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER, // Ensure this is set in your environment variables
        pass: process.env.EMAIL_PASS, // Ensure this is set in your environment variables
      },
    });

    const mailOptions = {
      from: '"Greua AI" <greuaAI@guerai.com>',
      to: email,
      subject:
        emailType === "verify" ? "Verify Your Account" : "Password Reset",
      html: `<h1>Hello User! Welcome to Greua AI</h1>
             <p>Please click the link below to ${
               emailType === "verify"
                 ? "verify your account"
                 : "reset your password"
             }:</p>
             <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
               Verify your email
             </a>
             <br>
             <p>This link will expire in 1 hour.</p>
             ${hashedToken}
             `,
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email. Please try again later.");
  }
};
