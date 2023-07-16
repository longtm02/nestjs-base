import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import dataSource from './data-source';

@Global()
@Module({
  imports: [TypeOrmModule.forRootAsync(dataSource)],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
