import { Controller, Get } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Get('folder-pi')
  folderPi() {
    return this.catalog.getFolderPi();
  }
}
