import { Module } from '@nestjs/common';
import { TurnstileService } from './turnstile.service';
import { RegisterRateLimitGuard } from './register-rate-limit.guard';

@Module({
  providers: [TurnstileService, RegisterRateLimitGuard],
  exports: [TurnstileService, RegisterRateLimitGuard],
})
export class SecurityModule {}
