import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateToImcome1778596380580 implements MigrationInterface {
    name = 'AddDateToImcome1778596380580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "income" ADD "date" date DEFAULT ('now'::text)::date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "income" DROP COLUMN "date"`);
    }

}
