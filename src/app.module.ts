import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
