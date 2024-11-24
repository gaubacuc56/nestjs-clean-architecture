// src/auth/handlers/login.handler.ts
import { BadRequestException, Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { hashSync } from "bcrypt";

import { AUTH_ERRORS } from "@Domain/common/constant/message/auth";
import { Result } from "@Domain/result";

import {
    IUserRepository,
    IUserRepositoryToken,
} from "@Application/interfaces/user";

import { Mapper } from "@Shared/mapper";

import { RegisterRequest, RegisterResponse } from "./register.dto";

@CommandHandler(RegisterRequest)
export class RegisterHandler implements ICommandHandler<RegisterRequest> {
    constructor(
        @Inject(IUserRepositoryToken)
        private readonly userRepository: IUserRepository,
    ) {}
    async execute(req: RegisterRequest): Promise<Result<RegisterResponse>> {
        const { email } = req;
        let user = await this.userRepository.findByEmail(email);
        if (user) throw new BadRequestException(AUTH_ERRORS.EXISTED_USER);

        user = await this.userRepository.createUser({
            ...req,
            password: hashSync(req.password, 10),
        });

        return new Result({
            data: Mapper(RegisterResponse, user),
        });
    }
}
