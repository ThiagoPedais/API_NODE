import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const user = await UserRepository.findById(user_id);
    const storageProvider = new DiskStorageProvider();

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.avatar) {
      await storageProvider.deleteFile(user.avatar);
      // const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      // if (userAvatarFileExists) {
      //   await fs.promises.unlink(userAvatarFilePath);
      // }
    }
    const fileName = await storageProvider.saveFile(avatarFilename);

    // user.avatar = avatarFilename;
    user.avatar = fileName;

    await UserRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
