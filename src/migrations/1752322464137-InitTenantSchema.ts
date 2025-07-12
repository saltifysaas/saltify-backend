import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTenantSchema1752322464137 implements MigrationInterface {
    name = 'InitTenantSchema1752322464137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenant" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "tenant" ADD "notes" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenant" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "tenant" DROP COLUMN "description"`);
    }

}
