import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';
import SESMail from '@config/mail/SESMail';
import mailConfig from '@config/mail/mail';

interface Request {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: Request): Promise<void> {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const token = await UserTokensRepository.generate(user.id);
    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')
    // console.log(token);
    if (mailConfig.driver === 'ses') {
      await SESMail.sendEmail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: '[TP Vendas] Recuperação de Senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `${process.env.APP_WEB_URL}/reset_password?token=${token.token}`,
          },
        },
      });
      return;
    }

    try {
      await EtherealMail.sendEmail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: '[TP Vendas] Recuperação de Senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `${process.env.APP_WEB_URL}/reset_password?token=${token.token}`,
          },
        },
      });
    } catch (err) {
      console.log('====================================');
      console.log(err);
      console.log('====================================');
    }
  }
}

export default SendForgotPasswordEmailService;
