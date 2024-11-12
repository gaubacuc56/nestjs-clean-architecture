import { Module } from "@nestjs/common";
import { UserService } from "@Application/features/user/user.service";
import { UserRepository } from "@Infrastructure/database/repository/user";

@Module({
  providers: [UserService, UserRepository],
  exports: [UserRepository, UserService]
})
export class UserModule { }
