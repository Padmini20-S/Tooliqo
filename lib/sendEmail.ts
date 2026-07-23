import { Resend } from "resend";
import {
  AccountVerificationEmail,
  ForgotPasswordEmail,
  PasswordChangedEmail,
  WelcomeEmail
} from "./emails";

// Use a fallback key for local build process where ENV might not be set
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_build");
const FROM_EMAIL = "Tooliqo <support@tooliqo.in>";

export async function sendVerificationEmail(email: string, name: string, otp: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Verify your email • Tooliqo",
      html: AccountVerificationEmail(name, otp),
    });

    if (error) {
      console.error("Error sending verification email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send verification email:", error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(email: string, name: string, otp: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Reset your password • Tooliqo",
      html: ForgotPasswordEmail(name, otp),
    });

    if (error) {
      console.error("Error sending password reset email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    return { success: false, error };
  }
}

export async function sendPasswordChangedEmail(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Your password has been changed",
      html: PasswordChangedEmail(),
    });

    if (error) {
      console.error("Error sending password changed email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send password changed email:", error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Welcome to Tooliqo 🎉",
      html: WelcomeEmail(),
    });

    if (error) {
      console.error("Error sending welcome email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return { success: false, error };
  }
}
