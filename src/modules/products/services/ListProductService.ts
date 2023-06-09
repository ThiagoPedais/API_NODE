import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';
import redisCache from '@shared/cache/RedisCache';


class ListProductService {
  public async execute(): Promise<Product[]> {

    // const redisCache = new RedisCache()

    let products = await redisCache.recover<Product[]>('api-vendas-PRODUCT_LIST')


    if (!products){
      products = await ProductRepository.find();

      await redisCache.save('api-vendas-PRODUCT_LIST', products)
    }

    return products;
  }
}

export default ListProductService;
