import { Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity("Student")
export class Student {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
