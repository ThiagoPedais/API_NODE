import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const emailUser = await UserRepository.findByEmail(email);

    if (emailUser) {
      throw new AppError('User name already exist');
    }

    const user = UserRepository.create({
      name,
      email,
      password,
    });

    await UserRepository.save(user);

    return user;
  }
}

export default CreateUserService;
