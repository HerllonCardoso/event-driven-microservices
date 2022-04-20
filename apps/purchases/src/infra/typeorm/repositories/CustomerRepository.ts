import { getRepository, Repository } from "typeorm";
import { ICreateCustomerDTO } from "dto/ICreateCustomerDTO";
import { Customer } from "../../../infra/typeorm/entities/Customer";
import { ICustomerRepository } from "repositories/ICustomerRepository";

export class CustomerRepository implements ICustomerRepository {
  private customerRepository: Repository<Customer>;
  constructor() {
    this.customerRepository = getRepository(Customer);
  }
  async create({ name, email }: ICreateCustomerDTO): Promise<Customer> {
    return this.customerRepository.save({
      name,
      email,
    });
  }
}
