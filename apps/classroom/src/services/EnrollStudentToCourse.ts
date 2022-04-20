import { IEnrollmentsRepository } from "repositories/IEnrollmentsRepository";
import { IStudentsRepository } from "repositories/IStudentsRepository";
import { inject, injectable } from "tsyringe";
import { Course } from "../infra/typeorm/entities/Course";
import { Enrollment } from "../infra/typeorm/entities/Enrollment";
import { Student } from "../infra/typeorm/entities/Student";
import { CoursesRepository } from "../infra/typeorm/repositories/CoursesRepository";
import { EnrollmentsRepository } from "../infra/typeorm/repositories/EnrollmentsRepository";
import { StudentsRepository } from "../infra/typeorm/repositories/StudentsRepository";
import { ICoursesRepository } from "../repositories/ICoursesRepository";

interface EnrollStudentToCourseRequest {
  student: {
    name: string;
    email: string;
  };
  course: {
    title: string;
    purchasesProductId: string;
  };
  purchasesEnrolledByPurchaseId?: string;
}

@injectable()
export class EnrollStudentToCourse {
  constructor(
    @inject("StudentsRepository")
    private studentsRepository: IStudentsRepository,

    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,

    @inject("EnrollmentsRepository")
    private enrollmentsRepository: IEnrollmentsRepository
  ) {}

  async execute(request: EnrollStudentToCourseRequest): Promise<void> {
    let course = await this.coursesRepository.findByPurchasesProductId(
      request.course.purchasesProductId
    );

    if (!course) {
      await this.coursesRepository.create({
        title: request.course.title,
        purchasesProductId: request.course.purchasesProductId,
      });
    }

    let student = await this.studentsRepository.findByEmail(
      request.student.email
    );

    if (!student) {
      await this.studentsRepository.create({
        name: request.student.name,
        email: request.student.email,
      });
    }

    await this.enrollmentsRepository.create({
      courseId: course.id,
      studentId: student.id,
      createdAt: new Date(),
      purchasesEnrolledByPurchaseId: request.purchasesEnrolledByPurchaseId,
    });
  }
}
