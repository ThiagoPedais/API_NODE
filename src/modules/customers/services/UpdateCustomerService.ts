import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface Request {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: Request): Promise<Customer> {
    const customer = await CustomerRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found');
    }

    const customerExists = await CustomerRepository.findByEmail(email);
    if (customerExists && customer.email) {
      throw new AppError('There is already one customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await CustomerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
