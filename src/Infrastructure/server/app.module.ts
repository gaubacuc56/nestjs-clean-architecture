import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

import { DatabaseModule } from "@Infrastructure/database/database.module";

import { RolesGuard } from "@Presentation/middleware/rolesGuard";
import { AuthModule } from "@Presentation/module/auth";
import { CommonModule } from "@Presentation/module/common";
import { UserModule } from "@Presentation/module/user";

@Module({
    imports: [DatabaseModule, CommonModule, AuthModule, UserModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule {}
