// src/auth/handlers/login.handler.ts
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { UserRepository } from '@Infrastructure/database/repository/user';

import { Result } from '@Domain/result';

import { Mapper } from '@Shared/mapper';

import { GetUserRequest, GetUserResponse } from './getUser.dto';

@QueryHandler(GetUserRequest)
export class GetUserHandler implements IQueryHandler<GetUserRequest> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(req: GetUserRequest): Promise<Result<GetUserResponse | null>> {
    const { userId } = req;
    const user = await this.userRepository.findById(userId);
    return new Result({
      data: user ? Mapper(GetUserResponse, user) : null,
    });
  }
}
