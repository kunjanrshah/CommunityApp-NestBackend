import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email provider
    auth: {
      user: 'kunjanrshah@gmail.com', // Set in .env
      pass: 'enbbimtdntshnvfu', // Set in .env
    },
  });

  async sendPasswordResetEmail(email: string, token: string) {
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    await this.transporter.sendMail({
      from: `"Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      text: `Click the link below to reset your password: ${resetLink}`,
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });
  }
}
