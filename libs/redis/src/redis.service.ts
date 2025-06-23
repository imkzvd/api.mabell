import { Redis } from 'ioredis';
import * as process from 'process';
import { Injectable } from '@nestjs/common';
import { CacheService } from '../../../src/core/app/common/ports/cache.service.port';

@Injectable()
export class RedisService implements CacheService {
  private readonly _client: Redis;

  constructor() {
    this._client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      password: process.env.REDIS_PASSWORD,
    });
  }

  async get<T>(key: string): Promise<T | null> {
    return (await this._client.get(key)) as T | null;
  }

  async set<T extends string | number = string>(
    key: string,
    value: T,
    ttlSeconds?: number,
  ): Promise<void> {
    await this._client.set(
      key,
      value,
      'EX',
      ttlSeconds || parseInt(process.env.DEFAULT_TTL_SECONDS || '300', 10),
    );
  }

  async del(key: string): Promise<void> {
    await this._client.del(key);
  }

  async delByPrefix(prefix: string): Promise<void> {
    const keys = await this._client.keys(`${prefix}:*`);

    if (!keys.length) return;

    await this._client.del(...keys);
  }

  async has(key: string): Promise<boolean> {
    return !!(await this._client.exists(key));
  }
}
