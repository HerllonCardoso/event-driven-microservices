export interface ICreateEnrollmentsDTO {
  studentId: number;
  courseId: number;
  createdAt: Date;
  inactivatedAt?: Date;
  purchasesEnrolledByPurchaseId: string;
}
