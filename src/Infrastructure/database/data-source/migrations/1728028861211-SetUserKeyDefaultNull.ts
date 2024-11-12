import { MigrationInterface, QueryRunner } from "typeorm";

export class SetUserKeyDefaultNull1728028861211 implements MigrationInterface {
    name = 'SetUserKeyDefaultNull1728028861211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`reset_key\` \`reset_key\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`reset_key_expired\` \`reset_key_expired\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`reset_key_expired\` \`reset_key_expired\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`reset_key\` \`reset_key\` varchar(255) NOT NULL`);
    }

}
