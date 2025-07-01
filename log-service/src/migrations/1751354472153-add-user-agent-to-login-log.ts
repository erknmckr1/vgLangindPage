import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAgentToLoginLog1751354472153 implements MigrationInterface {
  name = 'AddUserAgentToLoginLog1751354472153';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "login_logs" ADD "userAgent" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "login_logs" DROP COLUMN "userAgent"`);
  }
}
