import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    sequre: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  } as SMTPTransport.Options);

  async sendMail() {
    return;
  }

  async sendActivationMail(email: string, activationLink: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Активация аккаунта на "${process.env.API_URL}"`,
      text: '',
      html: `
        <div>
          <h2>Для активации аккаунта перейдите по ссылке:</h2>
          <a href="${activationLink}">
            <h3>Для активации аккаунта перейдите по ссылке:</h2>
          </a>
        </div>
      `,
    });
  }
}
