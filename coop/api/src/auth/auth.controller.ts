import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { RegisterRateLimitGuard } from '../security/register-rate-limit.guard';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  @UseGuards(RegisterRateLimitGuard)
  register(@Body() dto: RegisterDto, @Req() req: Request) {
    const ip =
      (req.headers['cf-connecting-ip'] as string | undefined) ??
      (req.headers['x-forwarded-for'] as string | undefined)
        ?.split(',')[0]
        ?.trim() ??
      req.ip ??
      undefined;
    return this.auth.register(dto, ip);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }
}
