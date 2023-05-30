import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import { isAfter, addHours } from 'date-fns';
import UserRepository from '../typeorm/repositories/UserRepository';
import { hash } from 'bcryptjs';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface Request {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: Request): Promise<void> {
    const userToken = await UserTokensRepository.findByToken(token);
    if (!userToken) {
      throw new Error('User token does not exists');
    }

    const user = await UserRepository.findById(userToken.user_id);
    if (!user) {
      throw new Error('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }


    user.password = await hash(password, 8)
    await UserRepository.save(user)
  }
}

export default ResetPasswordService;
