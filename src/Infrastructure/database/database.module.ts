import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Entities } from "@Domain/entities";

import { NestOrmConfig } from "./data-source/orm-config";

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot(NestOrmConfig),
        TypeOrmModule.forFeature(Entities),
    ],
    exports: [TypeOrmModule.forFeature(Entities)],
})
export class DatabaseModule { }
