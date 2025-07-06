import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1751743465750 implements MigrationInterface {
  name = 'InitMigration1751743465750';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."login_logs_status_enum" AS ENUM('LOGIN', 'LOGOUT', 'EXPIRED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "login_logs" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "ipAddress" character varying NOT NULL, "loginAt" TIMESTAMP NOT NULL DEFAULT now(), "userAgent" character varying, "logoutAt" TIMESTAMP, "status" "public"."login_logs_status_enum" NOT NULL DEFAULT 'LOGIN', "sessionId" character varying, CONSTRAINT "PK_15f7b02ad55d5ba905b2962ebab" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "login_logs"`);
    await queryRunner.query(`DROP TYPE "public"."login_logs_status_enum"`);
  }
}
