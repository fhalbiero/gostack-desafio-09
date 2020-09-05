import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';



@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository) {}


  public async execute(): Promise<Customer[]> {
     const existentCustomers = await this.customersRepository.findAll();

     if (!existentCustomers) {
       throw new AppError('Customer email already exists');
     }

     return existentCustomers;
  }
}

export default ListCustomerService;
