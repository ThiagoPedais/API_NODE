import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth'



interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User
  token: string
}

class CreateSessionsService {
  public async execute({ email, password }: Request): Promise<Response> {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Password or email address invalid', 401);
    }

    const passwordConfirmed = await compare(password, user.password);
    if (!passwordConfirmed) {
      throw new AppError('Password or email address invalid', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
