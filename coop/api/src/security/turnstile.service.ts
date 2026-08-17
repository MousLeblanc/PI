import {
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const SITEVERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const MAX_TOKEN_LENGTH = 2048;

type SiteverifyResult = {
  success?: boolean;
  action?: string;
  hostname?: string;
  'error-codes'?: string[];
};

@Injectable()
export class TurnstileService {
  private readonly logger = new Logger(TurnstileService.name);

  constructor(private readonly config: ConfigService) {}

  async verify(
    token: string | undefined,
    expectedAction = 'signup',
  ): Promise<void> {
    const skip = this.config.get<string>('TURNSTILE_SKIP') === 'true';
    if (skip) {
      this.logger.debug('Turnstile skipped (TURNSTILE_SKIP=true)');
      return;
    }

    const secret = this.config.get<string>('TURNSTILE_SECRET_KEY')?.trim();
    const expectedHostnames = this.hostnames();

    if (
      !secret ||
      typeof token !== 'string' ||
      token.length === 0 ||
      token.length > MAX_TOKEN_LENGTH ||
      expectedHostnames.size === 0
    ) {
      throw new UnauthorizedException('Échec de la vérification anti-bot');
    }

    let result: SiteverifyResult;
    try {
      const res = await fetch(SITEVERIFY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        signal: AbortSignal.timeout(10_000),
        body: new URLSearchParams({ secret, response: token }),
      });
      if (!res.ok) {
        throw new Error(`siteverify ${res.status}`);
      }
      result = (await res.json()) as SiteverifyResult;
    } catch (err) {
      this.logger.error(
        `Turnstile siteverify unreachable: ${err instanceof Error ? err.message : 'unknown'}`,
      );
      throw new UnauthorizedException('Échec de la vérification anti-bot');
    }

    if (
      !result.success ||
      result.action !== expectedAction ||
      !result.hostname ||
      !expectedHostnames.has(result.hostname)
    ) {
      this.logger.warn(
        `Turnstile rejected action=${result.action ?? ''} hostname=${result.hostname ?? ''} codes=${(result['error-codes'] ?? []).join(',')}`,
      );
      throw new UnauthorizedException('Échec de la vérification anti-bot');
    }
  }

  private hostnames(): Set<string> {
    return new Set(
      (this.config.get<string>('TURNSTILE_HOSTNAMES') ?? '')
        .split(',')
        .map((hostname) => hostname.trim().toLowerCase())
        .filter(Boolean),
    );
  }
}
