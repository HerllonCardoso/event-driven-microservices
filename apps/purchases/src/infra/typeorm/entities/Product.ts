import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("Product")
export class Product {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  conteudo: string;
}
