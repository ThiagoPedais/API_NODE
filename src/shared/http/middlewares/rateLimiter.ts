import { Request, Response, NextFunction } from 'express';
import * as redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';


const redisClient = redis.createClient({
  legacyMode: true,
  socket:{
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  password: process.env.REDIS_PASS || undefined,
})

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1
});

(async () => {
  redisClient.connect()
})();



export default async function rateLimiter(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await limiter.consume(req.ip)
    return next()
  }
  catch (err) {
    throw new AppError("Too many requests", 429);
  }
}
