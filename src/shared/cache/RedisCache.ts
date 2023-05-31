import Redis, { Redis as RedisClient } from 'ioredis';
import chacheConfig from '@config/cache'
// import { RedisClient } from 'ioredis/built/connectors/SentinelConnector/types';

export default class RedisClass {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(chacheConfig.config.redis)
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key)

    if (!data) {
      return null
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}

