import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';

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
            link: `http://localhost:3000/reset_password?token=${token.token}`,
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
