import { Controller, Get } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Domain } from '@api.mabell/core';
import { MetadataRO } from './ros/metadata.ro';
import { Roles } from '../../decorators/roles.decorator';

@ApiCookieAuth()
@Roles(Domain.Admin.AdminRoles.Owner, Domain.Admin.AdminRoles.Admin, Domain.Admin.AdminRoles.Guest)
@Controller('/metadata')
export class MetadataController {
  @ApiOperation({ summary: 'Get metadata', operationId: 'getMetadata' })
  @ApiOkResponse({ description: 'Metadata', type: MetadataRO })
  @Get('/')
  getMetadata(): MetadataRO {
    return new MetadataRO();
  }
}
