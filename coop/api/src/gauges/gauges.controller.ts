import { Controller, Get, Query } from '@nestjs/common';
import { GaugesService } from './gauges.service';

@Controller('gauges')
export class GaugesController {
  constructor(private readonly gauges: GaugesService) {}

  @Get('pi')
  piCounter() {
    return this.gauges.getPiCounter();
  }

  @Get('postal')
  byPostal(@Query('code') code?: string) {
    return this.gauges.getPostalGauges(code);
  }

  @Get('leaderboard')
  leaderboard(@Query('limit') limit?: string) {
    const n = limit ? Number(limit) : 10;
    return this.gauges.getLeaderboard(Number.isFinite(n) ? n : 10);
  }

  @Get('zones')
  zones(@Query('code') code?: string) {
    return this.gauges.getZones(code);
  }

  @Get('social-proof')
  socialProof(
    @Query('postalCode') postalCode: string,
    @Query('streetName') streetName: string,
  ) {
    return this.gauges.getSocialProof(postalCode, streetName);
  }
}
