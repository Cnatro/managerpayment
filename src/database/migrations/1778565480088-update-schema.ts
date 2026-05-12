import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSchema1778565480088 implements MigrationInterface {
  name = 'UpdateSchema1778565480088';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "income" RENAME COLUMN "isDeleted" TO "is_deleted"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isDeleted"`);
    await queryRunner.query(`ALTER TABLE "deductions" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "deductions" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "deductions" DROP COLUMN "isDeleted"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "isDeleted"`);
    await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "isDeleted"`);
    await queryRunner.query(`ALTER TABLE "budgets" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "budgets" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "budgets" DROP COLUMN "isDeleted"`);
    await queryRunner.query(`ALTER TABLE "saving" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "saving" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "saving" DROP COLUMN "isDeleted"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "is_deleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "deductions" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "deductions" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "deductions" ADD "is_deleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "is_deleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD "is_deleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "budgets" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "budgets" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "budgets" ADD "is_deleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "saving" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "saving" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "saving" ADD "is_deleted" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "saving" DROP COLUMN "is_deleted"`);
    await queryRunner.query(`ALTER TABLE "saving" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "saving" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "budgets" DROP COLUMN "is_deleted"`);
    await queryRunner.query(`ALTER TABLE "budgets" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "budgets" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "is_deleted"`);
    await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "is_deleted"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "deductions" DROP COLUMN "is_deleted"`,
    );
    await queryRunner.query(
      `ALTER TABLE "deductions" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "deductions" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_deleted"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "saving" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "saving" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "saving" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "budgets" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "budgets" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "budgets" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "deductions" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "deductions" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "deductions" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "income" RENAME COLUMN "is_deleted" TO "isDeleted"`,
    );
  }
}
