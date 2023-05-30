import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import { hash } from 'bcryptjs';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface Request {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: Request): Promise<void> {
    const user = await UserRepository.findByEmail(email)

    if(!user) {
      throw new AppError("User does not exist")
    }

    const token = await UserTokensRepository.generate(user.id);
    console.log(token);

  }
}

export default SendForgotPasswordEmailService;
