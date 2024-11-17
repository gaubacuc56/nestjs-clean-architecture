import { Body, Controller, Delete, Get, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";

import { DeleteUserRequest } from "@Application/features/user/commands/deleteUser/deleteUser.dto";
import { GetUsersRequest } from "@Application/features/user/queries/getUsers/getUsers.dto";

@ApiTags("User")
@Controller("user")
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiQuery({ type: GetUsersRequest })
    getUsers(@Query() query: GetUsersRequest) {
        return this.queryBus.execute(query);
    }

    @Delete("delete")
    @ApiBody({ type: DeleteUserRequest })
    deleteUser(@Body() body: DeleteUserRequest) {
        return this.commandBus.execute(body);
    }
}
