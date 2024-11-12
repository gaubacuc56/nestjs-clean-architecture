import { AUTH_ERRORS } from "@Application/common/constant/message";
import {
    generateAccessToken,
    generateRefreshToken, verifyAuthorizationHeader
} from "@Application/utils/jwt";
import { transporter } from "@Application/utils/send-mail";
import {
    BadRequestException, UnauthorizedException
} from "@Domain/exceptions/error-handler";
import { compareSync, hashSync } from "bcrypt";
import crypto from "crypto";
import { IAuthService } from "./interface";
import { ISignUpResponse } from "@Application/DTOs/response/auth";
import { User } from "@Domain/entities/User";
import { Result } from "@Domain/result";
import { Mapper } from "@Shared/mapper";
import { config } from "@Domain/config";
import { Injectable } from "@nestjs/common";
import { UserRepository } from "@Infrastructure/database/repository/user";
import { LoginDto } from "@Application/DTOs/request/login.dto";
import { RegisterDto } from "@Application/DTOs/request/register.dto";
import { ForgotPasswordDto } from "@Application/DTOs/request/forgotPassword.dto";
import { ResetPasswordDto } from "@Application/DTOs/request/resetPassword.dto";
import { ChangePasswordDto } from "@Application/DTOs/request/changePassword.dto";

@Injectable()
export class AuthService implements IAuthService {
    constructor(private readonly userRepository: UserRepository) { }

    public async login(req: LoginDto) {
        const { email, password } = req;

        const user = await this.userRepository.findByEmail(email);
        if (user == null) {
            throw new BadRequestException(AUTH_ERRORS.INVALID_CREDENTIALS);
        } else {
            const isValidPassword = compareSync(password, user.password);
            if (!isValidPassword) {
                throw new BadRequestException(AUTH_ERRORS.INVALID_CREDENTIALS);
            }
            const token = await generateAccessToken(user.id);
            const refreshToken = await generateRefreshToken(user.id);
            return new Result({
                data: { token, refreshToken }
            });
        }
    }

    public async signup(req: RegisterDto) {
        const { email } = req;
        let user = await this.userRepository.findByEmail(email);
        if (user) throw new BadRequestException(AUTH_ERRORS.EXISTED_USER);

        user = await this.userRepository.createUser({
            ...req,
            password: hashSync(req.password, 10),
        });

        return new Result({
            data: Mapper(ISignUpResponse, user)
        });
    }

    public async refreshToken(req: string | undefined) {
        const payload = await verifyAuthorizationHeader(
            req,
            config.REFRESH_TOKEN_SECRET
        );

        if (!payload) throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);

        const token = await generateAccessToken(payload.userInfo);

        const refreshToken = await generateRefreshToken(payload.userInfo);
        return new Result({
            data: { token, refreshToken }
        });
    }

    public async forgotPassword(req: ForgotPasswordDto) {
        const { email } = req;
        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new BadRequestException(AUTH_ERRORS.USER_NOT_FOUND);

        const resetKey =
            crypto.randomBytes(32).toString("hex") + new Date().valueOf();
        const resetKeyExpired = new Date(Date.now() + 60000); // expire in 1 minute

        await this.userRepository.updateResetKey(
            user.id,
            resetKey,
            resetKeyExpired
        );

        const resetUrl = `${config.CLIENT_DOMAIN}/auth/reset-password?resetKey=${resetKey}`;

        await transporter.sendMail({
            from: '"Toan" <thaitoan3039015@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Reset your password", // Subject line
            html: `<p>Follow this link to reset your password: \n ${resetUrl}</p>`, // html body
        });
        return new Result({
            message: "Password reset email sent"
        });
    }

    public async resetPassword(req: ResetPasswordDto) {
        const { resetKey, newPassword } = req;
        const user = await this.userRepository.findByResetKey(resetKey);

        if (!user) {
            throw new BadRequestException(AUTH_ERRORS.INVALID_TOKEN);
        }

        const isOldPassword = compareSync(newPassword, user.password);

        if (isOldPassword) {
            throw new BadRequestException(AUTH_ERRORS.IS_OLD_PASSWORD);
        }

        await this.userRepository.changePassword(
            user.id,
            hashSync(newPassword, 10)
        );
        await this.userRepository.updateResetKey(user.id, undefined, undefined);
        return new Result({
            message: "Password reset successful"
        });
    }

    public async changePassword(req: ChangePasswordDto & User) {
        const { id, password, oldPassword, newPassword } = req;

        const isOldPasswordValid = compareSync(oldPassword, password);

        if (!isOldPasswordValid) {
            throw new BadRequestException(AUTH_ERRORS.INVALID_PASSWORD);
        }

        if (oldPassword === newPassword) {
            throw new BadRequestException(AUTH_ERRORS.IS_OLD_PASSWORD);
        }

        await this.userRepository.changePassword(id, hashSync(newPassword, 10));

        return new Result({
            message: "Change password successful"
        });
    }
}
