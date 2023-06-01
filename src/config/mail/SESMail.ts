import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';
import mailConfig from '@config/mail/mail';

interface TemplateVariable {
  [key: string]: string | number;
}

interface ParseMailTemplate {
  file: string;
  variables: TemplateVariable;
}

interface MailContact {
  name: string;
  email: string;
}

interface SendMail {
  to: MailContact;
  from?: MailContact;
  subject: string;
  templateData: ParseMailTemplate;
}

export default class SESMail {
  static async sendEmail({ to, from, subject, templateData }: SendMail): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate()

    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01'
      })
    });

    const { email, name } = mailConfig.defaults.from;

    const message = await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData)
    });
  }
}
