import { Inject } from "@nestjs/common";
import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";

import { Result } from "@Domain/result";

import {
    IUserRepository,
    IUserRepositoryToken,
} from "@Application/interfaces/user";

import { Mapper } from "@Shared/mapper";

import { GetUserRequest, GetUserResponse } from "./getUser.dto";

@QueryHandler(GetUserRequest)
export class GetUserHandler implements IQueryHandler<GetUserRequest> {
    constructor(
        @Inject(IUserRepositoryToken)
        private readonly userRepository: IUserRepository,
    ) {}
    async execute(
        req: GetUserRequest,
    ): Promise<Result<GetUserResponse | null>> {
        const { id } = req;
        const user = await this.userRepository.findById(id);
        return new Result({
            data:
                user && !user.isDeleted ? Mapper(GetUserResponse, user) : null,
        });
    }
}
