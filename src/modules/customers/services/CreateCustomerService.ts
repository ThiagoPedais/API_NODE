import AppError from '@shared/errors/AppError';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';
import Customer from '../typeorm/entities/Customer';

interface Request {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: Request): Promise<Customer> {
    const emailExists = await CustomerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already exist');
    }

    const customer = CustomerRepository.create({
      name,
      email,
    });

    await CustomerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
