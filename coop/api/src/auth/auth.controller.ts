import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RegisterRateLimitGuard } from '../security/register-rate-limit.guard';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  @UseGuards(RegisterRateLimitGuard)
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Post('login')
  @UseGuards(RegisterRateLimitGuard)
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }
}
