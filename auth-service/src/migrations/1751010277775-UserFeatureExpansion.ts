import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserFeatureExpansion1751010277775 implements MigrationInterface {
  name = 'UserFeatureExpansion1751010277775';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "store_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "storeName" character varying NOT NULL, "slogan" character varying, "category" character varying, "bio" character varying, "logo" character varying, "theme" character varying, "userId" uuid, CONSTRAINT "REL_a12087701d2068468b16cf2a9c" UNIQUE ("userId"), CONSTRAINT "PK_3a2562f89040b31a75a60b2048e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_6ad7b08e6491a02ebc9ed82019d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "billing_infos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "iban" character varying, "bankName" character varying, "taxId" character varying, "invoiceTitle" character varying, "isPrimary" boolean NOT NULL DEFAULT false, "userId" uuid, CONSTRAINT "PK_93abacf97c1113d5ce6da5cf749" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "isOnboardingCompleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_profiles" ADD CONSTRAINT "FK_a12087701d2068468b16cf2a9c9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_types" ADD CONSTRAINT "FK_b4a6748b26fb01cded40c9714fc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "billing_infos" ADD CONSTRAINT "FK_a8f4f04847519210ca0f52c911f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "billing_infos" DROP CONSTRAINT "FK_a8f4f04847519210ca0f52c911f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_types" DROP CONSTRAINT "FK_b4a6748b26fb01cded40c9714fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_profiles" DROP CONSTRAINT "FK_a12087701d2068468b16cf2a9c9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "isOnboardingCompleted"`,
    );
    await queryRunner.query(`DROP TABLE "billing_infos"`);
    await queryRunner.query(`DROP TABLE "product_types"`);
    await queryRunner.query(`DROP TABLE "store_profiles"`);
  }
}
