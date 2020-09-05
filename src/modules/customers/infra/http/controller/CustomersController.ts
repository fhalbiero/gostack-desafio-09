import { Request, Response } from 'express';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import ListCustomersService from '@modules/customers/services/ListCustomersService';

import { container } from 'tsyringe';

export default class CustomersController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createCustomerService = container.resolve(CreateCustomerService);

    const customer = await createCustomerService.execute({ name, email });

    return response.status(200).json(customer);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const listCustomer = container.resolve(ListCustomersService);

    const customers = await listCustomer.execute();

    return response.status(200).json(customers);
  }
}
