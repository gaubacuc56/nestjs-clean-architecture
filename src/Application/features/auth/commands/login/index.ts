// src/auth/handlers/login.handler.ts
import { BadRequestException, Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { compareSync } from "bcrypt";

import { AUTH_ERRORS } from "@Domain/common/constant/message/auth";
import { Result } from "@Domain/result";

import {
    IUserRepository,
    IUserRepositoryToken,
} from "@Application/interfaces/user";
import {
    generateAccessToken,
    generateRefreshToken,
} from "@Application/utils/jwt";

import { LoginRequest, LoginResponse } from "./login.dto";

@CommandHandler(LoginRequest)
export class LoginHandler implements ICommandHandler<LoginRequest> {
    constructor(
        @Inject(IUserRepositoryToken)
        private readonly userRepository: IUserRepository,
    ) {}
    async execute(req: LoginRequest): Promise<Result<LoginResponse>> {
        const { email, password } = req;

        const user = await this.userRepository.findByEmail(email);
        if (user == null) {
            throw new BadRequestException(AUTH_ERRORS.INVALID_CREDENTIALS);
        } else {
            const isValidPassword = compareSync(password, user.password);
            if (!isValidPassword) {
                throw new BadRequestException(AUTH_ERRORS.INVALID_CREDENTIALS);
            }
            const token = await generateAccessToken(user.id, [user.role]);
            const refreshToken = await generateRefreshToken(user.id);
            return new Result({
                data: { token, refreshToken },
            });
        }
    }
}
