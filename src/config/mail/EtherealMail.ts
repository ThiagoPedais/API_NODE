import nodemailer from 'nodemailer';

interface SendMail {
  to: string;
  body: string;
}

export default class EtherealMail {
  static async sendEmail({ to, body }: SendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

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
      from: 'tp@api.com.br',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log('====================================');
    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    console.log('====================================');
  }
}
