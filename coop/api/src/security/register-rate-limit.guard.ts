import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';

type Bucket = { count: number; resetAt: number };

@Injectable()
export class RegisterRateLimitGuard implements CanActivate {
  private readonly buckets = new Map<string, Bucket>();

  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const ip = req.ip ?? 'unknown';
    const route = (req.originalUrl ?? req.url ?? '/auth').split('?')[0];

    const max = Number(this.config.get('RATE_LIMIT_REGISTER_MAX') ?? 5);
    const windowMs = Number(
      this.config.get('RATE_LIMIT_REGISTER_WINDOW_MS') ?? 600_000,
    );
    const now = Date.now();
    const key = `${route}:${ip}`;
    let bucket = this.buckets.get(key);

    if (!bucket || now >= bucket.resetAt) {
      bucket = { count: 0, resetAt: now + windowMs };
      this.buckets.set(key, bucket);
    }

    bucket.count += 1;
    if (bucket.count > max) {
      throw new HttpException(
        'Trop de tentatives. Réessayez dans quelques minutes.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }
}
