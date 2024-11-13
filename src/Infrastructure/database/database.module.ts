import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Entities } from '@Domain/entities';

import { OrmDataSource } from './data-source/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(OrmDataSource), TypeOrmModule.forFeature(Entities)],
  exports: [TypeOrmModule.forFeature(Entities)],
})
export class DatabaseModule {}
