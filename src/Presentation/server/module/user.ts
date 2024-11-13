import { Module } from '@nestjs/common';

import { UserRepository } from '@Infrastructure/database/repository/user';

import { GetUserHandler } from '@Application/features/user/queries/getUser';

@Module({
  providers: [GetUserHandler, UserRepository],
  exports: [GetUserHandler, UserRepository],
})
export class UserModule {}
