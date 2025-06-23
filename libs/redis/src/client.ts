import Redis from 'ioredis';
import * as process from 'process';

export const redisClient = new Redis({
  password: process.env.REDIS_PASSWORD,
});
