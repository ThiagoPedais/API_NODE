import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const products = await ProductRepository.find();
    return products;
  }
}

export default ListProductService;
