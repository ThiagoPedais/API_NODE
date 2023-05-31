import { FindManyOptions } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface PaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customer[]
}

class ListCustomersService {
  public async execute(): Promise<PaginateCustomer> {
    const pageSize = 10;
    const pageNumber = 1;

    const options:FindManyOptions = {
      skip: (pageNumber - 1) * pageSize,
      take: pageSize
    }

    const [data, totalCount] = await CustomerRepository.findAndCount(options)
    const totalPages = Math.ceil(totalCount / pageSize)

    return {
      from: (pageNumber - 1) * pageSize + 1,
      to: Math.min(pageNumber * pageSize, totalCount),
      per_page: pageSize,
      total: totalCount,
      current_page: pageNumber,
      prev_page: pageNumber > 1 ? pageNumber - 1 : null,
      next_page: pageNumber < totalPages ? pageNumber + 1 : null,
      data,
    };
  }
}

export default ListCustomersService;
