import "dotenv/config";
import { CoursesRepository } from "infra/typeorm/repositories/CoursesRepository";
import { EnrollmentsRepository } from "infra/typeorm/repositories/EnrollmentsRepository";
import { StudentsRepository } from "infra/typeorm/repositories/StudentsRepository";
import { EnrollStudentToCourse } from "services/EnrollStudentToCourse";
import { kafka } from "./providers/MessagingProvider/kafka";

interface PurchasesNewPurchaseMessage {
  product: {
    id: string;
    title: string;
  };
  customer: {
    name: string;
    email: string;
  };
  purchaseId: string;
}

async function main() {
  const consumer = kafka.consumer({
    groupId: "classroom-group",
    allowAutoTopicCreation: true,
  });

  await consumer.connect();
  await consumer.subscribe({ topic: "purchases.new-purchase" });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const purchaseJSON = message.value?.toString();

      if (!purchaseJSON) {
        return;
      }

      const purchase: PurchasesNewPurchaseMessage = JSON.parse(purchaseJSON);

      const studentsRepository = new StudentsRepository();
      const courseRepository = new CoursesRepository();
      const enrollmentRepository = new EnrollmentsRepository();

      const enrollStudentToCourse = new EnrollStudentToCourse(
        studentsRepository,
        courseRepository,
        enrollmentRepository
      );

      await enrollStudentToCourse.execute({
        student: {
          name: purchase.customer.name,
          email: purchase.customer.email,
        },
        course: {
          title: purchase.product.title,
          purchasesProductId: purchase.product.id,
        },
        purchasesEnrolledByPurchaseId: purchase.purchaseId,
      });

      console.log(
        `[Classroom] Enrolled user ${purchase.customer.name} to ${purchase.product.title}`
      );
    },
  });
}

main().then(() => {
  console.log("[Classroom] Listening to Kafka messages");
});
