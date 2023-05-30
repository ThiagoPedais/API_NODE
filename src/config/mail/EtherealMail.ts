import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface TemplateVariable {
  [key: string]: string | number;
}

interface ParseMailTemplate {
  template: string;
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

export default class EtherealMail {
  static async sendEmail({ to, from, subject, templateData }: SendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const mailTemplate = new HandlebarsMailTemplate()

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe TP',
        address: from?.email || 'tp@api.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData)
    });

    console.log('====================================');
    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    console.log('====================================');
  }
}
