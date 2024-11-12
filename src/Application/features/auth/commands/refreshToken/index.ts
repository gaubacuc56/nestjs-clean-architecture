// src/auth/handlers/login.handler.ts

import { UnauthorizedException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { config } from "@Domain/config";
import { Result } from "@Domain/result";

import { AUTH_ERRORS } from "@Application/common/constant/message";
import { verifyAuthorizationHeader, generateAccessToken, generateRefreshToken } from "@Application/utils/jwt";


import { RefreshTokenRequest, RefreshTokenResponse } from "./refreshToken.dto";


@CommandHandler(RefreshTokenRequest)
export class RefreshTokenHandler implements ICommandHandler<RefreshTokenRequest> {
    async execute(req: RefreshTokenRequest): Promise<Result<RefreshTokenResponse>> {
        const { header } = req;
        const payload = await verifyAuthorizationHeader(
            header,
            config.REFRESH_TOKEN_SECRET
        );

        if (!payload) throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);

        const token = await generateAccessToken(payload.userInfo);

        const refreshToken = await generateRefreshToken(payload.userInfo);
        return new Result({
            data: { token, refreshToken }
        });
    }
}