import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDeduction1779694186465 implements MigrationInterface {
    name = 'UpdateDeduction1779694186465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deductions" ADD CONSTRAINT "FK_a0532c13c3bf908f81709f13dc4" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deductions" DROP CONSTRAINT "FK_a0532c13c3bf908f81709f13dc4"`);
    }

}
