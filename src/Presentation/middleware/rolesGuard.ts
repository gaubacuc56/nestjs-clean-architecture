/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { HTTP_MSG } from "@Domain/common/constant/message/http";
import { Role } from "@Domain/common/enum/user";
import { config } from "@Domain/config";
import {
    ForbiddenException,
    UnauthorizedException,
} from "@Domain/exceptions/error-handler";

import { verifyAuthorizationHeader } from "@Application/utils/jwt";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.get<Role[]>(
            "roles",
            context.getHandler(),
        );
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        if (!request.headers["authorization"]) {
            throw new UnauthorizedException(HTTP_MSG.UNAUTHORIZED);
        }

        const user = await verifyAuthorizationHeader(
            request.headers["authorization"],
            config.JWT_SECRET,
        );

        if (
            requiredRoles.length &&
            !requiredRoles.some((role) => user["roles"].includes(role))
        ) {
            throw new ForbiddenException(HTTP_MSG.FORBIDDEN);
        }
        return true;
    }
}
