import { container } from "tsyringe";

import { CustomerRepository } from "infra/typeorm/repositories/CustomerRepository";
import { ProductRepository } from "infra/typeorm/repositories/ProductRepository";
import { PurchaseRepository } from "infra/typeorm/repositories/PurchaseRepository";
import { ICustomerRepository } from "repositories/ICustomerRepository";
import { IProductRepository } from "repositories/IProductRepository";
import { IPurchaseRepository } from "repositories/IPurchaseRepository";

import "./providers";

container.registerSingleton<ICustomerRepository>(
  "CustomerRepository",
  CustomerRepository
);

container.registerSingleton<IProductRepository>(
  "ProductRepository",
  ProductRepository
);

container.registerSingleton<IPurchaseRepository>(
  "PurchaseRepository",
  PurchaseRepository
);
