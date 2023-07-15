import { Global, Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';

import { ConfigService } from './services/config.service';
import { CommonService } from './services/common.service';
import { RedisClientService } from './services/redis.service';

@Global()
@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<any> => {
        return {
          config: {
            url: configService.redis.url,
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(`.env`),
    },
    CommonService,
    RedisClientService,
  ],
  exports: [ConfigService, CommonService, RedisClientService],
})
export class SharedModule {}
