// import { Customer } from "../../domain/customer";
// import { Purchase } from "../../domain/purchase";
// import { MessagingAdapter } from "../adapters/messaging-adapter";
// import { CustomersRepository } from "../repositories/customers-repository";
// import { ProductsRepository } from "../repositories/products-repository";
// import { PurchasesRepository } from "../repositories/purchases-repository";
import { KafkaMessagingProvider } from "@shared/containers/providers/MessagingProvider/implementations/KafkaMessagingProvider";
import { Purchase } from "infra/typeorm/entities/Purchase";
import { ICustomerRepository } from "repositories/ICustomerRepository";
import { IProductRepository } from "repositories/IProductRepository";
import { IPurchaseRepository } from "repositories/IPurchaseRepository";
import { injectable, inject } from "tsyringe";

interface PurchaseProductRequest {
  name: string;
  email: string;
  productId: number;
}

@injectable()
export class PurchaseProduct {
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository,

    @inject("ProductRepository")
    private productRepository: IProductRepository,

    @inject("PurchaseRepository")
    private purchaseRepository: IPurchaseRepository,

    @inject("MessagingProvider")
    private messagingProvider: KafkaMessagingProvider
  ) {}

  async execute({
    name,
    email,
    productId,
  }: PurchaseProductRequest): Promise<void> {
    const product = await this.productRepository.findById(productId);

    const productExists = !!product;

    if (!productExists) {
      throw new Error("Products does not exists");
    }

    const customer = await this.customerRepository.create({
      name,
      email,
    });

    const purchase = await this.purchaseRepository.create({
      customerId: customer.id,
      productId,
    });

    await this.messagingProvider.sendMessage({
      topic: "purchases.new-purchase",
      message: {
        product: {
          id: product.id,
          title: product.title,
        },
        customer: {
          name: customer.name,
          email: customer.email,
        },
        purchaseId: purchase.id,
      },
    });
  }
}
