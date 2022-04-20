import { Product } from 'infra/typeorm/entities/Product';

export interface IProductRepository {
  findById(id: number): Promise<Product | null>;
}
