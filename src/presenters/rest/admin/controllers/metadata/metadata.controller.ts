import { Controller, Get } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MetadataRO } from './ros/metadata.ro';

@ApiCookieAuth()
@Controller('/metadata')
export class MetadataController {
  @ApiOperation({ summary: 'Get metadata', operationId: 'getMetadata' })
  @ApiOkResponse({ description: 'Metadata', type: MetadataRO })
  @Get('/')
  getMetadata(): MetadataRO {
    return new MetadataRO();
  }
}
