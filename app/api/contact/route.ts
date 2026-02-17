import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const { name, email, subject, message } = await req.json();

        // Validate
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        // Configure SMTP transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Send email to the team
        await transporter.sendMail({
            from: `"ThreatAvoids Website" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
            replyTo: email,
            subject: `[ThreatAvoids Contact] ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 12px;">
                        New Contact Form Submission
                    </h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #64748b; width: 100px;"><strong>Name:</strong></td>
                            <td style="padding: 8px 0; color: #1e293b;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
                            <td style="padding: 8px 0; color: #1e293b;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #64748b;"><strong>Subject:</strong></td>
                            <td style="padding: 8px 0; color: #1e293b;">${subject}</td>
                        </tr>
                    </table>
                    <div style="margin-top: 16px; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                        <p style="color: #64748b; margin: 0 0 8px 0; font-size: 13px;"><strong>Message:</strong></p>
                        <p style="color: #1e293b; margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>
                    <p style="margin-top: 24px; color: #94a3b8; font-size: 12px;">
                        Sent from threatavoids.xyz contact form
                    </p>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to send message. Please try again." },
            { status: 500 }
        );
    }
}
