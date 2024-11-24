import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import path from "path";
import { DataSourceOptions } from "typeorm";

import { config } from "@Domain/config";

const sharedConfig = {
    host: config.DB_HOST,
    port: config.DB_PORT as number,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_SCHEMA,
    synchronize: false,
    logging: true,
    entities: [path.join(__dirname, "../../../Domain/entities/*.{js,ts}")],
    migrations: [path.join(__dirname, "/migrations/*.{js,ts}")],
    subscribers: [],
};

// For CLI Migrations
export const TypeOrmConfig: DataSourceOptions = {
    type: "mysql",
    ...sharedConfig,
};


// For Application Use
export const NestOrmConfig: TypeOrmModuleOptions = {
    type: "mysql",
    autoLoadEntities: true,
    ...sharedConfig,
};
