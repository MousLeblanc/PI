import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    // Lazy connect: don't block HTTP listen (Neon pooler can stall $connect at boot).
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
