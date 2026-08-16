import { Module } from '@nestjs/common';
import { GaugesController } from './gauges.controller';
import { GaugesService } from './gauges.service';

@Module({
  controllers: [GaugesController],
  providers: [GaugesService],
})
export class GaugesModule {}
