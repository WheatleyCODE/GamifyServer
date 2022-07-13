import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  async sendMail() {
    return;
  }

  async sendActivationMail(email: string, activationLink: string) {
    return;
  }
}
