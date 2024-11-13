import { Module, Global } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CommonController } from '@Presentation/controller/common';

@Global()
@Module({
  controllers: [CommonController],
  imports: [CqrsModule],
  exports: [CqrsModule],
})
export class CommonModule {}
