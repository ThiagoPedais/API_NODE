import { AppDataSource } from 'src/data-source';
import UserToken from '../entities/UserToken';

const UseTokensRepository = AppDataSource.getRepository(UserToken).extend({
  findByToken(token: string) {
    return this.createQueryBuilder('user')
      .where('user.token = :token', { token })
      .getOne();
  },
  async generate(user_id: string) {
    const userToken = this.create({
      user_id,
    });

    await this.save(userToken);
    return userToken;
  },
});

export default UseTokensRepository;
