import { ICreateEnrollmentsDTO } from "dto/ICreateEnrollmentsDTO";
import { IEnrollmentsRepository } from "repositories/IEnrollmentsRepository";
import { getRepository, Repository } from "typeorm";
import { Enrollment } from "../../../infra/typeorm/entities/Enrollment";

export class EnrollmentsRepository implements IEnrollmentsRepository {
  private enrollmentsRepository: Repository<Enrollment>;

  constructor() {
    this.enrollmentsRepository = getRepository(Enrollment);
  }

  async create({
    studentId,
    courseId,
    createdAt,
    inactivatedAt,
    purchasesEnrolledByPurchaseId,
  }: ICreateEnrollmentsDTO): Promise<Enrollment> {
    return this.enrollmentsRepository.save({
      studentId,
      courseId,
      createdAt,
      inactivatedAt,
      purchasesEnrolledByPurchaseId,
    });
  }
}
