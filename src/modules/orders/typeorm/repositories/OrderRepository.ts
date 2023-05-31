import { AppDataSource } from 'src/data-source';
import Order from '../entities/Order';
import Customer from '@modules/customers/typeorm/entities/Customer';

interface Product {
  product_id: string;
  price: number;
  quantity: number
}

interface Request {
  customer: Customer
  products: Product[]
}

const OrderRepository = AppDataSource.getRepository(Order).extend({
  async findById(id: string) {
    return await this.manager.findOne(Order, {
      where: { id },
      relations: ['order_products', 'customer']
    })
  },

  async createOrder({ customer, products }: Request) {
    const order = this.create({
      customer,
      order_products: products
    })
    await this.save(order)

    return order
  }

});

export default OrderRepository;
