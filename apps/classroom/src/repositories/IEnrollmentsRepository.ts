import { Enrollment } from "../infra/typeorm/entities/Enrollment";
import { ICreateEnrollmentsDTO } from "../dto/ICreateEnrollmentsDTO";

export interface IEnrollmentsRepository {
  create(enrollment: ICreateEnrollmentsDTO): Promise<Enrollment>;
}
