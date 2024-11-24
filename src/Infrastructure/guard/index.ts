// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// import { CacheService } from '@Infrastructure/memory-caching/cacheService';

import { Role } from '@Domain/common/enum/user';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
        // if (!requiredRoles) {
        //     return true; // No roles required, allow access
        // }


        const request = context.switchToHttp().getRequest();
        console.log("request", request)
        // const user = request.user; // Assuming the user object is populated after authentication
        // console.log("user", user)

        // if (!user) {
        //     throw new ForbiddenException('User not authenticated');
        // }

        // const hasRole = requiredRoles.some(role => user.roles?.includes(role));
        // if (!hasRole) {
        //     throw new ForbiddenException('You do not have permission to access this resource');
        // }

        return true;
    }
}
