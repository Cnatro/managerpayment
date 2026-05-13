import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorFieldBudget1778646257029 implements MigrationInterface {
    name = 'RefactorFieldBudget1778646257029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budgets" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "budgets" DROP COLUMN "month"`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD "start_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD "end_date" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budgets" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "budgets" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "budgets" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD "month" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD "category_id" integer NOT NULL`);
    }

}
