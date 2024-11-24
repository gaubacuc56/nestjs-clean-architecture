import { CacheInterceptor } from "@nestjs/cache-manager";
import { Body, Controller, Delete, Get, Query, UseInterceptors } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";

import { Role } from "@Domain/common/enum/user";

import { DeleteUserRequest } from "@Application/features/user/commands/deleteUser/deleteUser.dto";
import { GetUsersRequest } from "@Application/features/user/queries/getUsers/getUsers.dto";

import { Roles } from "@Presentation/middleware/roles";

@ApiTags("User")
@Controller("user")
@UseInterceptors(CacheInterceptor)
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Get()
    @ApiQuery({ type: GetUsersRequest })
    @Roles(Role.ADMIN)
    getUsers(@Query() query: GetUsersRequest) {
        return this.queryBus.execute(query);
    }

    @Delete("delete")
    @ApiBody({ type: DeleteUserRequest })
    deleteUser(@Body() body: DeleteUserRequest) {
        return this.commandBus.execute(body);
    }
}
