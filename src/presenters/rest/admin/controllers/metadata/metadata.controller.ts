import { Controller, Get } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MetadataRO } from './ros/metadata.ro';

@ApiCookieAuth()
@Controller('/metadata')
export class MetadataController {
  @ApiOperation({
    summary: 'Get all metadata',
    operationId: 'getAll',
  })
  @ApiOkResponse({ description: 'Metadata', type: MetadataRO })
  @Get('/')
  getAll(): MetadataRO {
    return new MetadataRO();
  }
}
