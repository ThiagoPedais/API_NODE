import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

class ListProductService {
  public async execute(id: string): Promise<Product | undefined> {
    const product = await ProductRepository.findOne({
      where: {
        id: id
      }
    });

    if(!product) {
      throw new AppError("Product not found.", 404)
    }

    return product;
  }
}

export default ListProductService;
