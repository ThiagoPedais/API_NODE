import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';

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
    // console.log(token);

    try {
      await EtherealMail.sendEmail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: '[TP Vendas] Recuperação de Senha',
        templateData: {
          template: `Olá {{name}}: {{token}}`,
          variables: {
            name: user.name,
            token: token.token
          }
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
