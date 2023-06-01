import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';
import redisCache from '@shared/cache/RedisCache';


interface Request {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: Request): Promise<Product> {
    const productExists = await ProductRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    // const redisCache = new RedisCache()

    const product = ProductRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await ProductRepository.save(product);

    return product;
  }
}


export default CreateProductService;
