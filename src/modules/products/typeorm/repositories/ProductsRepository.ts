import { AppDataSource } from "src/data-source";
import Product from "../entities/Product";


// export const ProductRepository = AppDataSource.getRepository(Product);
export const UserRepository = AppDataSource.getRepository(Product).extend({
  findByName(name: string) {
    return this.createQueryBuilder('product')
      .where('product.name = :name', { name })
      .getMany();
  },
});
