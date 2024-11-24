// src/infrastructure/database/repositories.module.ts
import { Module, DynamicModule, Global } from "@nestjs/common";

import { IUserRepositoryToken } from "@Application/interfaces/user";

import { UserRepository } from "./user";

const repositories = [
    { provide: IUserRepositoryToken, useClass: UserRepository },
];

@Global()
@Module({})
export class RepositoriesModule {
    static register(): DynamicModule {
        return {
            module: RepositoriesModule,
            providers: repositories,
            exports: repositories,
        };
    }
}
