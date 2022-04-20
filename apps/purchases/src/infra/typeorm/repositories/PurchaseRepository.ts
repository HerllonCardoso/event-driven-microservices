import { getRepository, Repository } from "typeorm";
import { ICreatePurchaseDTO } from "dto/ICreatePurchaseDTO";
import { Purchase } from "../../../../src/infra/typeorm/entities/Purchase";
import { IPurchaseRepository } from "repositories/IPurchaseRepository";
import { producer } from "../../../../../classroom/src/shared/containers/providers/MessagingProvider/producer";

export class PurchaseRepository implements IPurchaseRepository {
  private purchaseRepository: Repository<Purchase>;
  constructor() {
    this.purchaseRepository = getRepository(Purchase);
  }
  async create({
    customerId,
    productId,
  }: ICreatePurchaseDTO): Promise<Purchase> {
    return this.purchaseRepository.save({
      customerId: customerId,
      productId: productId,
    });
  }
}
