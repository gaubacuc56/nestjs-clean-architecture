// src/auth/handlers/login.handler.ts
import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { compareSync, hashSync } from "bcrypt";

import { UserRepository } from "@Infrastructure/database/repository/user";

import { Result } from "@Domain/result";

import { AUTH_ERRORS } from "@Application/common/constant/message";

import { ChangePasswordRequest } from "./changePassword.dto";

@CommandHandler(ChangePasswordRequest)
export class ChangePasswordHandler
    implements ICommandHandler<ChangePasswordRequest>
{
    constructor(private readonly userRepository: UserRepository) {}
    async execute(req: ChangePasswordRequest): Promise<Result> {
        const { id, password, oldPassword, newPassword } = req;

        const isOldPasswordValid = compareSync(oldPassword, password);

        if (!isOldPasswordValid) {
            throw new BadRequestException(AUTH_ERRORS.INVALID_PASSWORD);
        }

        if (oldPassword === newPassword) {
            throw new BadRequestException(AUTH_ERRORS.IS_OLD_PASSWORD);
        }

        await this.userRepository.changePassword(id, hashSync(newPassword, 10));

        return new Result({
            message: "Change password successful",
        });
    }
}
