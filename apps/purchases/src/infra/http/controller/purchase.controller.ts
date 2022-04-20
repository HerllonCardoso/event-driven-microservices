import { Request, Response } from "express";
import { container } from "tsyringe";
import { PurchaseProduct } from "../../../services/CreatePurchaseProduct";

export class PurchaseController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { productId, name, email } = request.body;

    const purchaseProduct = container.resolve(PurchaseProduct);

    const purchase = await purchaseProduct.execute({
      productId,
      name,
      email,
    });

    return response.status(201).json(purchase);
  }
}
