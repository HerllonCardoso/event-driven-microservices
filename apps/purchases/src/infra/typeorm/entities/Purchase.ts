import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("Purchase")
export class Purchase {
  @PrimaryColumn()
  id: number;

  @Column()
  customerId: string;

  @Column()
  productId: string;

  @CreateDateColumn()
  createdAt: number;
}
