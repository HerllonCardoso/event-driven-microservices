import { ICreateStudentsDTO } from "dto/ICreateStudentsDTO";
import { IStudentsRepository } from "repositories/IStudentsRepository";
import { getRepository, Repository } from "typeorm";
import { Student } from "../../../infra/typeorm/entities/Student";

export class StudentsRepository implements IStudentsRepository {
  private studentRepository: Repository<Student>;
  constructor() {
    this.studentRepository = getRepository(Student);
  }

  async findByEmail(email: string): Promise<Student | null> {
    return this.studentRepository.findOne({
      where: { email },
    });
  }

  async create({ name, email }: ICreateStudentsDTO): Promise<Student> {
    return this.studentRepository.save({
      name,
      email,
    });
  }
}
