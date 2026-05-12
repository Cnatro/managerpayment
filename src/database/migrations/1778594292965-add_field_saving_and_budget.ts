import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldSavingAndBudget1778594292965 implements MigrationInterface {
    name = 'AddFieldSavingAndBudget1778594292965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budgets" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "saving" ADD "user_id" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "saving" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "budgets" DROP COLUMN "user_id"`);
    }

}
