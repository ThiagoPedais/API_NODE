import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import { compare, hash } from 'bcryptjs';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User
}

class CreateSessionsService {
  public async execute({ email, password }: Request): Promise<User> {

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Password or email address invalid', 401);
    }

    const passwordConfirmed = await compare(password, user.password);
    if (!passwordConfirmed) {
      throw new AppError('Password or email address invalid', 401);
    }

    return user;
  }
}

export default CreateSessionsService;
