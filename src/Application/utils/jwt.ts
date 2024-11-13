/* eslint-disable @typescript-eslint/no-unused-vars */
import * as jwt from 'jsonwebtoken';

import { ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } from '@Domain/common/constant/jwt';
import { HTTP_MSG } from '@Domain/common/constant/message';
import { config } from '@Domain/config';
import { UnauthorizedException } from '@Domain/exceptions/error-handler';

import { AUTH_ERRORS } from '@Application/common/constant/message';

export const generateAccessToken = async (userInfo: string) => {
  const token = jwt.sign(
    {
      userInfo,
    },
    config.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRATION },
  );
  return token;
};

export const generateRefreshToken = async (userInfo: string) => {
  const token = jwt.sign(
    {
      userInfo,
    },
    config.REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRATION },
  );
  return token;
};

const verifyToken = async (token: string, type: string) => {
  return jwt.verify(token, type) as jwt.JwtPayload;
};

export const verifyAuthorizationHeader = async (
  authorization: string | undefined,
  tokenSecret: string,
) => {
  if (!authorization) {
    throw new UnauthorizedException(HTTP_MSG.UNAUTHORIZED);
  }

  const token = authorization.replace('Bearer ', '');
  if (!token) {
    throw new UnauthorizedException(HTTP_MSG.UNAUTHORIZED);
  }

  try {
    const payload = await verifyToken(token, tokenSecret);
    if (!payload) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);
    }
    return payload;
  } catch (error) {
    throw new UnauthorizedException(HTTP_MSG.UNAUTHORIZED);
  }
};
