import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDeduction1779688140132 implements MigrationInterface {
    name = 'UpdateDeduction1779688140132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deductions" RENAME COLUMN "category" TO "categoryId"`);
        await queryRunner.query(`ALTER TABLE "deductions" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "deductions" ADD "categoryId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deductions" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "deductions" ADD "categoryId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "deductions" RENAME COLUMN "categoryId" TO "category"`);
    }

}
