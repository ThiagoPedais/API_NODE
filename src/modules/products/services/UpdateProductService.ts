import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';

interface Request {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: Request): Promise<Product> {
    const productExists = await ProductRepository.findByName(name);
    const product = await ProductRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await ProductRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
