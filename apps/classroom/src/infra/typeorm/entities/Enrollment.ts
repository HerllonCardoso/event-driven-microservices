import { Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity("Enrollment")
export class Enrollment {
  @PrimaryColumn()
  id: number;

  @Column()
  studentId: string;

  @Column()
  courseId: string;

  //   @CreateDateColumn()
  //   inactivatedAt: Date;

  //   purchasesEnrolledByPurchasedId

  @CreateDateColumn()
  createdAt: number;
}
