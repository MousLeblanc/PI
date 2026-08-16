import {
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TurnstileService {
  private readonly logger = new Logger(TurnstileService.name);

  constructor(private readonly config: ConfigService) {}

  async verify(token: string | undefined, ip?: string): Promise<void> {
    const skip = this.config.get<string>('TURNSTILE_SKIP') === 'true';
    if (skip) {
      this.logger.debug('Turnstile skipped (TURNSTILE_SKIP=true)');
      return;
    }

    const secret = this.config.get<string>('TURNSTILE_SECRET_KEY');
    if (!secret) {
      throw new UnauthorizedException('Anti-bot non configuré');
    }
    if (!token) {
      throw new UnauthorizedException('Jeton anti-bot manquant');
    }

    const body = new URLSearchParams();
    body.set('secret', secret);
    body.set('response', token);
    if (ip) body.set('remoteip', ip);

    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      { method: 'POST', body },
    );
    const data = (await res.json()) as { success?: boolean };
    if (!data.success) {
      throw new UnauthorizedException('Échec de la vérification anti-bot');
    }
  }
}
