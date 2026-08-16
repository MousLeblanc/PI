import { Controller, Get, Query } from '@nestjs/common';
import { GeoService } from './geo.service';

@Controller('geo')
export class GeoController {
  constructor(private readonly geo: GeoService) {}

  @Get('streets')
  streets(
    @Query('q') q: string,
    @Query('postalCode') postalCode: string,
  ) {
    return this.geo.searchStreets(q ?? '', postalCode ?? '').then((items) => ({
      items,
    }));
  }
}
