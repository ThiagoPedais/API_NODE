import { AppDataSource } from 'src/data-source';
import Product from '../entities/Product';
import { DataSource, In, Repository } from 'typeorm';

interface FindProducts {
  id: string;
}


export const ProductRepository = AppDataSource.getRepository(Product).extend({
  async findByName(name: string) {
    return await this.createQueryBuilder('product')
      .where('product.name = :name', { name })
      .getOne();
  },

  async findAllByIds(products: FindProducts[]) {
    const productIds = products.map(product => product.id)
    const existsProducts = await this.find({
      where: {
        id: In(productIds)
      }
    })
    return existsProducts
  },
});
