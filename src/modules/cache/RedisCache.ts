import Redis, { Redis as RedisClient } from 'ioredis';
import chacheConfig from '@config/cache'
// import { RedisClient } from 'ioredis/built/connectors/SentinelConnector/types';

export default class RedisClass {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(chacheConfig.config.redis)
  }

  public async save(key: string, value: any): Promise<void> {
    console.log('====================================');
    console.log(key, value);
    console.log('====================================');
  }

  // public async recover<T>(key: string): Promise<T | null> {}

  // public async invalidate(key: string): Promise<void> {}
}

