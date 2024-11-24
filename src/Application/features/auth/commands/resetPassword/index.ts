// src/auth/handlers/login.handler.ts
import { BadRequestException, Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { compareSync, hashSync } from "bcrypt";

import { AUTH_ERRORS } from "@Domain/common/constant/message/auth";
import { Result } from "@Domain/result";

import {
    IUserRepository,
    IUserRepositoryToken,
} from "@Application/interfaces/user";

import { ResetPasswordRequest } from "./resetPassword.dto";

@CommandHandler(ResetPasswordRequest)
export class ResetPasswordHandler
    implements ICommandHandler<ResetPasswordRequest>
{
    constructor(
        @Inject(IUserRepositoryToken)
        private readonly userRepository: IUserRepository,
    ) {}
    async execute(req: ResetPasswordRequest): Promise<Result> {
        const { resetKey, newPassword } = req;
        const user = await this.userRepository.findByResetKey(resetKey);

        if (!user) {
            throw new BadRequestException(AUTH_ERRORS.INVALID_TOKEN);
        }

        const isOldPassword = compareSync(newPassword, user.password);

        if (isOldPassword) {
            throw new BadRequestException(AUTH_ERRORS.IS_OLD_PASSWORD);
        }

        await this.userRepository.changePassword(
            user.id,
            hashSync(newPassword, 10),
        );
        await this.userRepository.updateResetKey(user.id, undefined, undefined);
        return new Result({
            message: "Password reset successful",
        });
    }
}
