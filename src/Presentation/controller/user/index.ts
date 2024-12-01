import { Body, Controller, Delete, Get, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";

import { Role } from "@Domain/common/enum/user";
import { Result } from "@Domain/result";

import { DeleteUserRequest } from "@Application/features/user/commands/deleteUser/deleteUser.dto";
import { GetUserResponse } from "@Application/features/user/queries/getUser/getUser.dto";
import { GetUsersRequest } from "@Application/features/user/queries/getUsers/getUsers.dto";

import { Roles } from "@Presentation/decorator/roles";

@ApiTags("User")
@Controller("user")
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Get()
    @ApiQuery({ type: GetUsersRequest })
    @ApiBearerAuth()
    @Roles(Role.USER)
    getUsers(@Query() query: GetUsersRequest): Promise<Result<GetUserResponse[] | null>> {
        return this.queryBus.execute(query);
    }

    @Delete("delete")
    @ApiBody({ type: DeleteUserRequest })
    deleteUser(@Body() body: DeleteUserRequest) {
        return this.commandBus.execute(body);
    }
}
