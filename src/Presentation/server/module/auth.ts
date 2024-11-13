import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";

import { ChangePasswordHandler } from "@Application/features/auth/commands/changePassword";
import { ForgotPasswordHandler } from "@Application/features/auth/commands/forgotPassword";
import { LoginHandler } from "@Application/features/auth/commands/login";
import { RefreshTokenHandler } from "@Application/features/auth/commands/refreshToken";
import { RegisterHandler } from "@Application/features/auth/commands/register";
import { ResetPasswordHandler } from "@Application/features/auth/commands/resetPassword";

import { AuthController } from "@Presentation/controller/auth";
import { AuthMiddleware } from "@Presentation/middleware/auth";
import { UserModule } from "@Presentation/server/module/user";

@Module({
  imports: [UserModule],
        providers: [LoginHandler, RegisterHandler, ChangePasswordHandler, ForgotPasswordHandler, ResetPasswordHandler, RefreshTokenHandler],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'auth/change-password', method: RequestMethod.PUT },
        { path: 'auth/me', method: RequestMethod.GET },
      );
  }
}
