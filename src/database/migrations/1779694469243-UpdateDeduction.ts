import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDeduction1779694469243 implements MigrationInterface {
    name = 'UpdateDeduction1779694469243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deductions" DROP CONSTRAINT "FK_a0532c13c3bf908f81709f13dc4"`);
        await queryRunner.query(`ALTER TABLE "deductions" RENAME COLUMN "categoryId" TO "category_id"`);
        await queryRunner.query(`ALTER TABLE "deductions" ADD CONSTRAINT "FK_d711b6fb6a6c0dba72850c75a82" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deductions" DROP CONSTRAINT "FK_d711b6fb6a6c0dba72850c75a82"`);
        await queryRunner.query(`ALTER TABLE "deductions" RENAME COLUMN "category_id" TO "categoryId"`);
        await queryRunner.query(`ALTER TABLE "deductions" ADD CONSTRAINT "FK_a0532c13c3bf908f81709f13dc4" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
