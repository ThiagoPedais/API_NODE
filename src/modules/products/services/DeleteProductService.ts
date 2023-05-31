import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';


class DeleteProductService {
  public async execute(id: string): Promise<void> {
    const product = await ProductRepository.findOne({
      where: {
        id: id,
      },
    });



    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    const redisCache = new RedisCache()

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await ProductRepository.remove(product);
  }
}

export default DeleteProductService;
