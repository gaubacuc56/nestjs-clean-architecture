import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Entities } from "@Domain/entities";

import { NestOrmConfig } from "./data-source/orm-config";
import { RepositoriesModule } from "./repository/repository.module";

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot(NestOrmConfig),
        TypeOrmModule.forFeature(Entities),
        RepositoriesModule.register(),
    ],
    exports: [
        TypeOrmModule.forFeature(Entities),
        RepositoriesModule.register(),
    ],
})
export class DatabaseModule {}
