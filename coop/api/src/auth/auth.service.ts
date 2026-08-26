import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { TurnstileService } from '../security/turnstile.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import postalCodes from '../data/belgian-postal-codes.json';

function lookupCommune(postalCode: string): string | null {
  const map = postalCodes as Record<string, string>;
  return map[postalCode] ?? null;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly mail: MailService,
    private readonly turnstile: TurnstileService,
  ) {}

  async register(dto: RegisterDto) {
    await this.turnstile.verify(dto.turnstileToken, 'signup');

    if (dto.ageBands.length !== dto.householdSize) {
      throw new BadRequestException(
        'Le nombre de tranches d’âge doit égaler la taille du ménage',
      );
    }

    const email = dto.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException('Un compte existe déjà avec cet email');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        householdSize: dto.householdSize,
        ageBands: dto.ageBands,
        postalCode: dto.postalCode,
        streetName: dto.streetName.trim(),
        houseNumber: dto.houseNumber.trim(),
        optInPublicNumber: dto.optInPublicNumber,
        walletAddress: null,
      },
      select: {
        id: true,
        email: true,
        postalCode: true,
        householdSize: true,
        createdAt: true,
      },
    });

    await this.mail.sendRegistrationConfirmation({
      email: user.email,
      postalCode: user.postalCode,
      commune: lookupCommune(user.postalCode),
    });
    const accessToken = await this.signToken(user.id, user.email);
    const piHouseholdCount = await this.prisma.user.count();
    return {
      user,
      accessToken,
      piHouseholdCount,
      /** @deprecated alias — même valeur que piHouseholdCount */
      piPersonCount: piHouseholdCount,
      decimalsAdded: 1,
    };
  }

  async login(dto: LoginDto) {
    await this.turnstile.verify(dto.turnstileToken, 'login');
    const email = dto.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    const accessToken = await this.signToken(user.id, user.email);
    return {
      user: {
        id: user.id,
        email: user.email,
        postalCode: user.postalCode,
        householdSize: user.householdSize,
        createdAt: user.createdAt,
      },
      accessToken,
    };
  }

  private signToken(sub: string, email: string) {
    return this.jwt.signAsync({ sub, email });
  }
}
