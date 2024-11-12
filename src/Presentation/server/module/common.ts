
import {Module } from "@nestjs/common";
import { CommonController } from "@Presentation/controller/common";

@Module({
  controllers: [CommonController],
})
export class CommonModule {}
