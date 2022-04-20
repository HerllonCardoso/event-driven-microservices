import { ICoursesRepository } from "repositories/ICoursesRepository";
import { getRepository, Repository } from "typeorm";
import { Course } from "../../../../src/infra/typeorm/entities/Course";
import { ICreateCoursesDTO } from "../../../dto/ICreateCoursesDTO";

export class CoursesRepository implements ICoursesRepository {
  private coursesRepository: Repository<Course>;
  constructor() {
    this.coursesRepository = getRepository(Course);
  }

  async findByPurchasesProductId(
    purchasesProductId: string
  ): Promise<Course | null> {
    return this.coursesRepository.findOne({
      where: { purchasesProductId },
    });
  }

  async create({title, purchasesProductId}: ICreateCoursesDTO): Promise<Course> {
    return this.coursesRepository.save({
      title,
      purchasesProductId,
    });
  }
}
