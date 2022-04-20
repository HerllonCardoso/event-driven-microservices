import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateEnrollment1650459961497 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Enrollment",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "studentId",
            type: "int",
          },
          {
            name: "courseId",
            type: "int",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );

    //2foreingkey
    await queryRunner.createForeignKey(
      'Enrollment',
      new TableForeignKey({
        columnNames: ['studentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Student',
        onDelete: 'CASCADE',
        name: 'fk_student_1',
      }),
    );

    await queryRunner.createForeignKey(
      'Enrollment',
      new TableForeignKey({
        columnNames: ['courseId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Course',
        onDelete: 'CASCADE',
        name: 'fk_course_1',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Enrollment");
  }
}
