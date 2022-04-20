import { Course } from "../infra/typeorm/entities/Course";
import { ICreateCoursesDTO } from "../dto/ICreateCoursesDTO";

export interface ICoursesRepository {
  findByPurchasesProductId(purchasesProductId: string): Promise<Course | null>;
  create(course: ICreateCoursesDTO): Promise<Course>;
}
