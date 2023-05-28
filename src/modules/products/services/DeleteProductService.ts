import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

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

    await ProductRepository.remove(product);
  }
}

export default DeleteProductService;
