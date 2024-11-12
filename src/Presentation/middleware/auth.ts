import { Response, NextFunction } from 'express';
import { NestMiddleware, Injectable } from '@nestjs/common';
import { config } from "@Domain/config";
import { UnauthorizedException } from "@Domain/exceptions/error-handler";
import { UserService } from "@Application/features/user/user.service";
import { verifyAuthorizationHeader } from "@Application/utils/jwt";
import { AUTH_ERRORS } from "@Application/common/constant/message";
import { IFindUserResponse } from "@Application/DTOs/response/user";
import { RequestBody } from "@Shared/types";

interface IReAuthRequest<T> extends RequestBody<T> {
  body: T & IFindUserResponse;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) { }

  async use<T>(req: IReAuthRequest<T>, res: Response, next: NextFunction) {
    try {
      const payload = await verifyAuthorizationHeader(req.header("authorization"), config.JWT_SECRET);

      const user = await this.userService.findById({ id: payload.userInfo });


      if (!user) next();
      else req.body = { ...req.body, ...user.data };
      next();
    } catch (error) {
      console.log("error", error);
      next(new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN));
    }
  }
}