// src/auth/handlers/login.handler.ts
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { compareSync } from 'bcrypt';

import { UserRepository } from '@Infrastructure/database/repository/user';

import { Result } from '@Domain/result';

import { AUTH_ERRORS } from '@Application/common/constant/message';
import { generateAccessToken, generateRefreshToken } from '@Application/utils/jwt';

import { LoginRequest, LoginResponse } from './login.dto';

@CommandHandler(LoginRequest)
export class LoginHandler implements ICommandHandler<LoginRequest> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(req: LoginRequest): Promise<Result<LoginResponse>> {
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
        data: { token, refreshToken },
      });
    }
  }
}
