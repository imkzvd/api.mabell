import { Controller, Get } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { MetadataRO } from './ros/metadata.ro';
import { Roles } from '../../decorators/roles.decorator';
import { AdminRoles } from '../../../../../core/domain/components/admin/constants/admin-roles';

@ApiCookieAuth()
@Roles(AdminRoles.Owner, AdminRoles.Admin, AdminRoles.Guest)
@Controller('/metadata')
export class MetadataController {
  @ApiOperation({ summary: 'Get metadata', operationId: 'getMetadata' })
  @ApiOkResponse({ description: 'Metadata', type: MetadataRO })
  @Get('/')
  getMetadata(): MetadataRO {
    return new MetadataRO();
  }
}
