import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AuthService } from "@Application/features/auth/service";
import { AuthController } from "@Presentation/controller/auth";
import { UserModule } from "@Presentation/server/module/user";
import { AuthMiddleware } from "@Presentation/middleware/auth";

@Module({
  imports: [UserModule],
  providers: [AuthService],
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
