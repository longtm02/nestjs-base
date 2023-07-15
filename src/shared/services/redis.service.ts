import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class RedisClientService {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  async get(key: string): Promise<any> {
    const value = await this.redis.get(key);

    return JSON.parse(value);
  }

  set(key: string, value: any, time: number): Promise<any> {
    return this.redis.set(key, JSON.stringify(value), 'EX', time);
  }
}
