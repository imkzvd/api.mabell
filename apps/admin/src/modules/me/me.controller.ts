import { Controller, Get, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AdminRoles } from '@core/domain/components/admin/constants/admin-roles';
import { AccessTokenPayload } from '@core/app/components/admin-token/types';
import { QueryBus } from '@infrastructure/query-bus';
import { GetAdminQuery } from '@core/app/cqrs/admin/queries/get-admin/get-admin.query';
import { UnauthorizedException } from '@core/shared/exceptions';
import { LoggedAdminProfileRO } from './ros/logged-admin-profile.ro';
import { Roles } from '../../decorators/roles.decorator';

@ApiTags('Me')
@Roles(AdminRoles.Owner, AdminRoles.Admin, AdminRoles.Guest)
@Controller({ path: '/me' })
export class MeController {
  constructor(private readonly _queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Get profile of logged user', operationId: 'getProfile' })
  @ApiOkResponse({ description: 'Profile', type: LoggedAdminProfileRO })
  @Get('/profile')
  async getProfile(@Req() req: Request): Promise<LoggedAdminProfileRO> {
    const { sub } = req.user as AccessTokenPayload;

    const foundAdmin = await this._queryBus.execute(new GetAdminQuery(sub));

    if (!foundAdmin) {
      throw new UnauthorizedException();
    }

    return new LoggedAdminProfileRO(foundAdmin);
  }
}
