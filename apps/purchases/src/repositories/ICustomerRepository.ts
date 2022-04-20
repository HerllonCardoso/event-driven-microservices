import { Customer } from "../infra/typeorm/entities/Customer";
import { ICreateCustomerDTO } from "../dto/ICreateCustomerDTO";

export interface ICustomerRepository {
  create(customer: ICreateCustomerDTO): Promise<Customer>;
}
