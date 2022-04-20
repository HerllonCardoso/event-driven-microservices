import { getRepository, Repository } from "typeorm";
import { IProductRepository } from "repositories/IProductRepository";
import { Product } from "../entities/Product";

export class ProductRepository implements IProductRepository {
  private productRepository: Repository<Product>;
  constructor() {
    this.productRepository = getRepository(Product);
  }

  public async findById(id: number): Promise<Product | null> {
    return this.productRepository.findOne({
      where: { id },
    });
  }
}
