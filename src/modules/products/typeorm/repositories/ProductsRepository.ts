import { AppDataSource } from 'src/data-source';
import Product from '../entities/Product';
import { DataSource, Repository } from 'typeorm';


export const ProductRepository = AppDataSource.getRepository(Product).extend({
  findByName(name: string) {
    return this.createQueryBuilder('product')
      .where('product.name = :name', { name })
      .getOne();
  },
});
