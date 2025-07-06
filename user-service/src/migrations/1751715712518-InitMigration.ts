import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1751715712518 implements MigrationInterface {
  name = 'InitMigration1751715712518';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "store_profiles" DROP COLUMN "theme"`);
    await queryRunner.query(`ALTER TABLE "themes" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "themes" ADD CONSTRAINT "UQ_d085240c9b35398725b28466336" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "themes" ADD CONSTRAINT "FK_d085240c9b35398725b28466336" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "themes" DROP CONSTRAINT "FK_d085240c9b35398725b28466336"`,
    );
    await queryRunner.query(
      `ALTER TABLE "themes" DROP CONSTRAINT "UQ_d085240c9b35398725b28466336"`,
    );
    await queryRunner.query(`ALTER TABLE "themes" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "store_profiles" ADD "theme" character varying`,
    );
  }
}
