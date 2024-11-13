// src/auth/handlers/login.handler.ts
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import crypto from 'crypto';

import { UserRepository } from '@Infrastructure/database/repository/user';

import { config } from '@Domain/config';
import { Result } from '@Domain/result';

import { AUTH_ERRORS } from '@Application/common/constant/message';
import { transporter } from '@Application/utils/send-mail';

import { ForgotPasswordRequest } from './forgotPassword.dto';

@CommandHandler(ForgotPasswordRequest)
export class ForgotPasswordHandler implements ICommandHandler<ForgotPasswordRequest> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(req: ForgotPasswordRequest): Promise<Result> {
    const { email } = req;
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new BadRequestException(AUTH_ERRORS.USER_NOT_FOUND);

    const resetKey = crypto.randomBytes(32).toString('hex') + new Date().valueOf();
    const resetKeyExpired = new Date(Date.now() + 60000); // expire in 1 minute

    await this.userRepository.updateResetKey(user.id, resetKey, resetKeyExpired);

    const resetUrl = `${config.CLIENT_DOMAIN}/auth/reset-password?resetKey=${resetKey}`;

    await transporter.sendMail({
      from: '"Toan" <thaitoan3039015@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Reset your password', // Subject line
      html: `<p>Follow this link to reset your password: \n ${resetUrl}</p>`, // html body
    });
    return new Result({
      message: 'Password reset email sent',
    });
  }
}
