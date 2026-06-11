import User from "../models/User.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { Resend } from "resend";

let resendInstance = null;
const getResend = () => {
    if (!resendInstance) {
        resendInstance = new Resend(process.env.RESEND_API_KEY);
    }
    return resendInstance;
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No account with that email address" });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

        user.resetPasswordToken = resetTokenHash;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send email via Resend
        const frontendUrl = process.env.FRONTEND_URL || `${req.protocol}://${req.get("host")}`;
        const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

        await getResend().emails.send({
            from: "MerNote <onboarding@resend.dev>",
            to: email,
            subject: "Password Reset Request",
            html: `
                <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
                    <h2 style="color: #00FF9D;">MerNote</h2>
                    <p>You requested a password reset. Click the button below to set a new password.</p>
                    <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: #00FF9D; color: #000; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0;">
                        Reset Password
                    </a>
                    <p style="color: #666; font-size: 14px;">This link expires in 1 hour. If you did not request this, please ignore this email.</p>
                </div>
            `,
        });

        res.json({ message: "Password reset link sent to your email" });
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({ message: "Failed to send reset email" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Hash the token from the URL to compare with stored hash
        const resetTokenHash = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken: resetTokenHash,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Update password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ message: "Failed to reset password" });
    }
};