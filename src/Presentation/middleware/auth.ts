import { NestMiddleware, Injectable } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";

import { Response, NextFunction } from "express";

import { config } from "@Domain/config";
import { UnauthorizedException } from "@Domain/exceptions/error-handler";

import { AUTH_ERRORS } from "@Application/common/constant/message";
import { GetUserResponse } from "@Application/features/user/queries/getUser/getUser.dto";
import { verifyAuthorizationHeader } from "@Application/utils/jwt";

import { RequestBody } from "@Shared/types";

interface IReAuthRequest<T> extends RequestBody<T> {
    body: T & GetUserResponse;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly queryBus: QueryBus) {}

    async use<T>(req: IReAuthRequest<T>, res: Response, next: NextFunction) {
        try {
            const payload = await verifyAuthorizationHeader(
                req.header("authorization"),
                config.JWT_SECRET,
            );

            const user = await this.queryBus.execute(payload.userInfo);

            if (!user) next();
            else req.body = { ...req.body, ...user.data };
            next();
        } catch (error) {
            console.log("error", error);
            next(new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN));
        }
    }
}
