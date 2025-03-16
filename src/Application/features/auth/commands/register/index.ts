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
import { TelegramService } from "@Application/webhook/telegram.service";

import { Mapper } from "@Shared/mapper";

import { RegisterRequest, RegisterResponse } from "./register.dto";

@CommandHandler(RegisterRequest)
export class RegisterHandler implements ICommandHandler<RegisterRequest> {
    constructor(
        @Inject(IUserRepositoryToken)
        private readonly userRepository: IUserRepository,
        private readonly telegramService: TelegramService,
    ) {}
    async execute(req: RegisterRequest): Promise<Result<RegisterResponse>> {
        const { email, name } = req;
        let user = await this.userRepository.findByEmail(email);
        if (user) throw new BadRequestException(AUTH_ERRORS.EXISTED_USER);

        user = await this.userRepository.createUser({
            ...req,
            password: hashSync(req.password, 10),
        });

        // Send Telegram notification
        const message = `🎉 New user created! \n👤 *Username:* ${name} \n📧 *Email:* ${email}`;
        await this.telegramService.sendMessage(message);

        return new Result({
            data: Mapper(RegisterResponse, user),
        });
    }
}
