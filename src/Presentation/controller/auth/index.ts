

import { Body, Controller, Get, Post, Put, Headers } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";

import { User } from "@Domain/entities/User";

import { ChangePasswordRequest } from "@Application/features/auth/commands/changePassword/changePassword.dto";
import { ForgotPasswordRequest } from "@Application/features/auth/commands/forgotPassword/forgotPassword.dto";
import { LoginRequest } from "@Application/features/auth/commands/login/login.dto";
import { RefreshTokenRequest } from "@Application/features/auth/commands/refreshToken/refreshToken.dto";
import { RegisterRequest } from "@Application/features/auth/commands/register/register.dto";
import { ResetPasswordRequest } from "@Application/features/auth/commands/resetPassword/resetPassword.dto";

import { RequestBody } from "@Shared/types";

@ApiTags('Authentication')
@Controller("auth")
export class AuthController {
  constructor(private readonly commandBus: CommandBus) { }

  @Post("login")
  @ApiBody({ type: LoginRequest })
  login(@Body() body: LoginRequest) {
    return this.commandBus.execute(body)
  }

  @Post("signup")
  @ApiBody({ type: RegisterRequest })
  signup(@Body() body: RegisterRequest) {
    return this.commandBus.execute(body)
  }

  @Post("forgot-password")
  @ApiBody({ type: ForgotPasswordRequest })
  forgotPassword(@Body() body: ForgotPasswordRequest) {
    return this.commandBus.execute(body)
  }

  @Post("reset-password")
  @ApiBody({ type: ResetPasswordRequest })
  resetPassword(@Body() body: ResetPasswordRequest) {
    return this.commandBus.execute(body)
  }

  @ApiBearerAuth()
  @Post("refresh-token")
  refreshToken(@Headers('authorization') authorization: string) {
    return this.commandBus.execute(new RefreshTokenRequest(authorization))
  }

  @ApiBearerAuth()
  @Put("change-password")
  @ApiBody({ type: ChangePasswordRequest })
  changePassword(@Body() body: ChangePasswordRequest) {
    return this.commandBus.execute(body)
  }

  @ApiBearerAuth()
  @Get("me")
  me(@Body() body: RequestBody<User>) {
    return body;
  }
}
