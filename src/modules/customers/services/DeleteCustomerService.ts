import AppError from '@shared/errors/AppError';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

class DeleteCustomerService {
  public async execute(id: string): Promise<void> {
    const customer = await CustomerRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    await CustomerRepository.remove(customer);
  }
}

export default DeleteCustomerService;
