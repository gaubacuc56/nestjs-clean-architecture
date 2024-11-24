import { Module } from "@nestjs/common";

import { DeleteUserdHandler } from "@Application/features/user/commands/deleteUser";
import { GetUserHandler } from "@Application/features/user/queries/getUser";
import { GetUsersHandler } from "@Application/features/user/queries/getUsers";

import { UserController } from "@Presentation/controller/user";

@Module({
    providers: [GetUserHandler, DeleteUserdHandler, GetUsersHandler],
    exports: [GetUserHandler],
    controllers: [UserController],
})
export class UserModule {}
