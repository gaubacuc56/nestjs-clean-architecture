import { config } from "@Domain/config";
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const OrmDataSource: TypeOrmModuleOptions = {
    type: "mysql",
    host: config.DB_HOST,
    port: config.DB_PORT as number,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_SCHEMA,
    synchronize: false,
    logging: true,
    entities: [__dirname, "../../../Domain/entities/*.{js,ts}"],
    migrations: [__dirname, "/migrations/*.{js,ts}"],
    subscribers: [],
    autoLoadEntities: true,
};
