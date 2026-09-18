import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  // Credentials come from the loaded env file (e.g. .env.dev via NODE_ENV).
  // The hardcoded fallbacks keep local/out-of-the-box testing working even if
  // the env file is missing the keys.
  private readonly fromEmail = process.env.EMAIL_USER || 'kunjanrshah@gmail.com';
  private readonly fromName = process.env.EMAIL_NAME || 'Community App Support';

  private transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email provider
    auth: {
      user: this.fromEmail,
      pass: process.env.EMAIL_PASS || 'enbbimtdntshnvfu',
    },
  });

  async sendPasswordResetEmail(email: string, token: string) {
    // Use the public (ngrok) base URL when available so the reset link opens
    // correctly from any device, otherwise fall back to localhost. You can also
    // pin a custom frontend URL with RESET_LINK_BASE if one is deployed.
    const baseUrl =
      process.env.RESET_LINK_BASE ||
      (process.env.NGROK_DOMAIN ? `https://${process.env.NGROK_DOMAIN}` : 'http://localhost:3000');

    const resetLink = `${baseUrl}/reset-password?token=${token}`;

    await this.transporter.sendMail({
      from: `"${this.fromName}" <${this.fromEmail}>`,
      to: email,
      subject: 'Password Reset Request',
      text: `Click the link below to reset your password: ${resetLink}`,
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });
  }

  async sendTemporaryPasswordEmail(email: string, temporaryPassword: string) {
    const baseUrl =
      process.env.RESET_LINK_BASE ||
      (process.env.NGROK_DOMAIN ? `https://${process.env.NGROK_DOMAIN}` : 'http://localhost:3000');

    await this.transporter.sendMail({
      from: `"${this.fromName}" <${this.fromEmail}>`,
      to: email,
      subject: 'Your New Temporary Password',
      text:
        `A temporary password has just been generated for your account.\n\n` +
        `Temporary password: ${temporaryPassword}\n\n` +
        `Sign in at ${baseUrl} and change the password as soon as possible.`,
      html:
        `<p>A temporary password has just been generated for your account.</p>` +
        `<p><strong>Temporary password:</strong> <code>${temporaryPassword}</code></p>` +
        `<p>Sign in at <a href="${baseUrl}">${baseUrl}</a> and change the password as soon as possible.</p>`,
    });
  }
}
