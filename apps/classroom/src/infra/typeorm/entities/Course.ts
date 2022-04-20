import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("Course")
export class Course {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  purchaseProductId: string;
}
