import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { environment } from '../../../../../environment/environment';

@Injectable()
export class SendEmailService {
  constructor() {
    sgMail.setApiKey(environment.SENDGRID_API_KEY_DEV);
  }

  sendHtmlEmail({
    from,
    to,
    subject,
    html,
  }: {
    from: string;
    to: string | string[];
    subject: string;
    html: string;
  }) {
    const msg = {
      from,
      to,
      subject,
      html,
    };
    return sgMail.send(msg);
  }
}
