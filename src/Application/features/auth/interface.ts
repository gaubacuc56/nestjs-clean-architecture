import { ChangePasswordDto } from "@Application/DTOs/request/changePassword.dto";
import { ForgotPasswordDto } from "@Application/DTOs/request/forgotPassword.dto";
import { LoginDto } from "@Application/DTOs/request/login.dto";
import { RegisterDto } from "@Application/DTOs/request/register.dto";
import { ResetPasswordDto } from "@Application/DTOs/request/resetPassword.dto";
import { ILoginResponse, IRefreshTokenResponse, ISignUpResponse } from "@Application/DTOs/response/auth";
import { User } from "@Domain/entities/User";
import { Result } from "@Domain/result";

export interface IAuthService {
    login(req: LoginDto): Promise<Result<ILoginResponse>>;
    signup(req: RegisterDto): Promise<Result<ISignUpResponse>>;
    refreshToken(req: string | undefined): Promise<Result<IRefreshTokenResponse>>;
    forgotPassword(req: ForgotPasswordDto): Promise<Result>;
    resetPassword(req: ResetPasswordDto): Promise<Result>;
    changePassword(req: ChangePasswordDto & User): Promise<Result>;
}
