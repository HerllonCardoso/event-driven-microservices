import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("Customer")
export class Customer {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  conteudo: string;

  @Column()
  email: string;
}
