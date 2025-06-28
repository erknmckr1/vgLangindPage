import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixRefreshTokenType1751026852488 implements MigrationInterface {
  name = 'FixRefreshTokenType1751026852488';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "refreshToken" character varying`,
    );
  }
}
