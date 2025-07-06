import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1751459553424 implements MigrationInterface {
  name = 'InitMigration1751459553424';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_6ad7b08e6491a02ebc9ed82019d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "billing_infos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "iban" character varying, "bankName" character varying, "taxId" character varying, "invoiceTitle" character varying, "isPrimary" boolean NOT NULL DEFAULT false, "userId" uuid, CONSTRAINT "PK_93abacf97c1113d5ce6da5cf749" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "storeName" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "refreshToken" text, "isOnboardingCompleted" boolean NOT NULL DEFAULT false, "onboardingStep" integer NOT NULL DEFAULT '1', "onboardingStatus" character varying NOT NULL DEFAULT 'pending', "accountType" character varying, "profileType" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2f478512e1f437deba3e5f43927" UNIQUE ("storeName"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "store_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slogan" character varying, "category" character varying, "bio" character varying, "logo" character varying, "theme" character varying, "userId" uuid, CONSTRAINT "REL_a12087701d2068468b16cf2a9c" UNIQUE ("userId"), CONSTRAINT "PK_3a2562f89040b31a75a60b2048e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "themes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "previewImage" character varying, CONSTRAINT "PK_ddbeaab913c18682e5c88155592" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_types" ADD CONSTRAINT "FK_b4a6748b26fb01cded40c9714fc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "billing_infos" ADD CONSTRAINT "FK_a8f4f04847519210ca0f52c911f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_profiles" ADD CONSTRAINT "FK_a12087701d2068468b16cf2a9c9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "store_profiles" DROP CONSTRAINT "FK_a12087701d2068468b16cf2a9c9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "billing_infos" DROP CONSTRAINT "FK_a8f4f04847519210ca0f52c911f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_types" DROP CONSTRAINT "FK_b4a6748b26fb01cded40c9714fc"`,
    );
    await queryRunner.query(`DROP TABLE "themes"`);
    await queryRunner.query(`DROP TABLE "store_profiles"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "billing_infos"`);
    await queryRunner.query(`DROP TABLE "product_types"`);
  }
}
