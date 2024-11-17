// src/auth/handlers/login.handler.ts

import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { UserRepository } from "@Infrastructure/database/repository/user";

import { Result } from "@Domain/result";

import { AUTH_ERRORS } from "@Application/common/constant/message";

import { DeleteUserRequest } from "./deleteUser.dto";

@CommandHandler(DeleteUserRequest)
export class DeleteUserdHandler implements ICommandHandler<DeleteUserRequest> {
    constructor(private readonly userRepository: UserRepository) {}
    async execute(req: DeleteUserRequest): Promise<Result> {
        const { id } = req;
        const user = await this.userRepository.findById(id);

        if (!user || user.isDeleted)
            throw new BadRequestException(AUTH_ERRORS.USER_NOT_FOUND);

        await this.userRepository.deleteUser(id);

        return new Result({});
    }
}
