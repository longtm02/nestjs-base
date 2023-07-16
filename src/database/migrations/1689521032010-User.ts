import { MigrationInterface, QueryRunner } from "typeorm";

export class User1689521032010 implements MigrationInterface {
    name = 'User1689521032010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(255), "first_name" character varying(100) DEFAULT '', "last_name" character varying(100) DEFAULT '', "avatar" character varying, "phone_code" character varying(5), "phone_number" character varying(15), "deleted_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
