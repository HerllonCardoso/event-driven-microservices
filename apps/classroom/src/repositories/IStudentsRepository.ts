import { Student } from "../infra/typeorm/entities/Student";
import { ICreateStudentsDTO } from "../dto/ICreateStudentsDTO";

export interface IStudentsRepository {
  findByEmail(email: String): Promise<Student | null>;
  create(student: ICreateStudentsDTO): Promise<Student>;
}
