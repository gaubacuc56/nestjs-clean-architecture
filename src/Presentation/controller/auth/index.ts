import { Body, Controller, Get, Post, Put, Headers } from "@nestjs/common";
import { AuthService } from "@Application/features/auth/service";
import { User } from "@Domain/entities/User";
import { RequestBody } from "@Shared/types";
import { LoginDto } from "@Application/DTOs/request/login.dto";
import { ForgotPasswordDto } from "@Application/DTOs/request/forgotPassword.dto";
import { ResetPasswordDto } from "@Application/DTOs/request/resetPassword.dto";
import { ChangePasswordDto } from "@Application/DTOs/request/changePassword.dto";
import { RegisterDto } from "@Application/DTOs/request/register.dto";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags('Authentication')
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  @ApiBody({ type: LoginDto })
  login(@Body() body: LoginDto) {
    return this.authService.login(body)
  }

  @Post("signup")
  @ApiBody({ type: RegisterDto })
  signup(@Body() body: RegisterDto) {
    return this.authService.signup(body)
  }

  @Post("forgot-password")
  @ApiBody({ type: ForgotPasswordDto })
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body)
  }

  @Post("reset-password")
  @ApiBody({ type: ResetPasswordDto })
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body)
  }

  @Post("refresh-token")
  refreshToken(@Headers('authorization') authorization: string) {
    return this.authService.refreshToken(authorization)
  }

  @ApiBearerAuth()
  @Put("change-password")
  @ApiBody({ type: ChangePasswordDto })
  changePassword(@Body() body: ChangePasswordDto & User) {
    return this.authService.changePassword(body)
  }

  @ApiBearerAuth()
  @Get("me")
  me(@Body() body: RequestBody<User>) {
    return body;
  }
}
