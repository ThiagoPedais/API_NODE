import { AppDataSource } from 'src/data-source';
import Customer from '../entities/Customer';

const CustomerRepository = AppDataSource.getRepository(Customer).extend({
  async findByName(name: string) {
    return await this.createQueryBuilder('user')
      .where('user.name = :name', { name })
      .getOne();
  },
  async findById(id: string) {
    return await this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  },
  async findByEmail(email: string) {
    return await this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  },
});

export default CustomerRepository;
