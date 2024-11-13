import { Module } from "@nestjs/common";

import { DatabaseModule } from "@Infrastructure/database/database.module";

import { AuthModule } from "@Presentation/server/module/auth";
import { CommonModule } from "@Presentation/server/module/common";
import { UserModule } from "@Presentation/server/module/user";

@Module({
  imports: [DatabaseModule, CommonModule, AuthModule, UserModule],
})
export class AppModule {}
