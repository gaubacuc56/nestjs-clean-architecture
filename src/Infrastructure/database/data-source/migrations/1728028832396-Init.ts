import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1728028832396 implements MigrationInterface {
    name = 'Init1728028832396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`subtask\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`parent_id\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`taskId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`priority\` enum ('0', '1', '2') NOT NULL DEFAULT '1', \`status\` enum ('0', '1', '2', '3', '4') NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`reset_key\` varchar(255) NOT NULL, \`reset_key_expired\` datetime NOT NULL, \`role\` enum ('0', '1', '2') NOT NULL DEFAULT '2', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`userpersonalinfo\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_deleted\` tinyint NOT NULL DEFAULT 0, \`user_id\` varchar(255) NOT NULL, \`first_name\` varchar(255) NULL, \`last_name\` varchar(255) NULL, \`phone_number\` varchar(255) NULL, \`address\` varchar(255) NULL, UNIQUE INDEX \`IDX_84d18f8b7ffa27458ad9f3b6df\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`subtask\` ADD CONSTRAINT \`FK_8209040ec2c518c62c70cd382dd\` FOREIGN KEY (\`taskId\`) REFERENCES \`task\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`subtask\` DROP FOREIGN KEY \`FK_8209040ec2c518c62c70cd382dd\``);
        await queryRunner.query(`DROP INDEX \`IDX_84d18f8b7ffa27458ad9f3b6df\` ON \`userpersonalinfo\``);
        await queryRunner.query(`DROP TABLE \`userpersonalinfo\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`task\``);
        await queryRunner.query(`DROP TABLE \`subtask\``);
    }

}
