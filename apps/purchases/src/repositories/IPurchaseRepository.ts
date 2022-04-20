import { Purchase } from "../infra/typeorm/entities/Purchase";
import { ICreatePurchaseDTO } from "../dto/ICreatePurchaseDTO";

export interface IPurchaseRepository {
  create(purchase: ICreatePurchaseDTO): Promise<Purchase>;
}
