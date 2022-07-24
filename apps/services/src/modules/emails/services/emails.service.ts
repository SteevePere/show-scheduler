import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendTemplatedEmailData } from '../dtos/send-templated-email.dto';

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTemplatedEmail(data: SendTemplatedEmailData): Promise<void> {
    const { to, subject, data: bodyData, template } = data;
    await this.mailerService.sendMail({
      to,
      subject: subject,
      template,
      context: {
        ...bodyData,
      },
    });
  }
}
