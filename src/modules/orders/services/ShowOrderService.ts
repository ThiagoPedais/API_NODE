import AppError from '@shared/errors/AppError';
import Order from '@modules/orders/typeorm/entities/Order';
import OrderRepository from '../typeorm/repositories/OrderRepository';


interface Request {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: Request): Promise<Order> {

    const order = await OrderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}


export default ShowOrderService;
