import AppError from '@shared/errors/AppError';
import Order from '@modules/orders/typeorm/entities/Order';
import CustomerRepository from '@modules/customers/typeorm/repositories/CustomerRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import OrderRepository from '../typeorm/repositories/OrderRepository';

interface Product {
  id: string;
  quantity: number;
}

interface Request {
  customer_id: string;
  products: Product[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: Request): Promise<Order> {

    const customerExists = await CustomerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    const existsProducts = await ProductRepository.findAllByIds(products)
    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const existsProductsIds: string[] = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id)
    );
    if (checkInexistentProducts.length) {
      throw new AppError(`Count not find product ${checkInexistentProducts[0].id}`)
    };

    const quantityAvailable = products.filter(
      product => existsProducts.filter(
        p => p.id === product.id
      )[0].quantity < product.quantity
    );
    if (quantityAvailable.length) {
      throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`)
    };

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price
    }));

    const order = await OrderRepository.createOrder({
      customer: customerExists,
      products: serializedProducts
    });

    const { order_products } = order;
    const updatedProductQuantity = order_products.map(
      product => ({
        id: product.product_id,
        quantity: existsProducts.filter(p => p.id === product.id)[0].quantity - product.quantity,
      })
    );

    await ProductRepository.save(updatedProductQuantity);

    return order;
  }
}


export default CreateOrderService;
