import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface Request {
  user_id: string;
}

class ShowProfileService {
  public async execute({ user_id }: Request): Promise<User> {
    const user = await UserRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ShowProfileService;
