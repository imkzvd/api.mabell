import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Domain, App } from '@api.mabell/core';
import { QueryBus } from '@api.mabell/cqrs';
import { LoggedAdminProfileRO } from './ros/logged-admin-profile.ro';
import { Roles } from '../../decorators/roles.decorator';

@ApiTags('Me')
@Roles(Domain.Admin.AdminRoles.Owner, Domain.Admin.AdminRoles.Admin, Domain.Admin.AdminRoles.Guest)
@Controller({ path: '/me' })
export class MeController {
  constructor(private readonly _queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Get profile of logged user', operationId: 'getProfile' })
  @ApiOkResponse({ description: 'Profile', type: LoggedAdminProfileRO })
  @Get('/profile')
  async getProfile(@Req() req: Request): Promise<LoggedAdminProfileRO> {
    const { sub } = req.user as App.Components.AdminToken.AccessTokenPayload;

    const foundAdmin = await this._queryBus.execute(new App.CQRS.GetAdminQuery(sub));

    if (!foundAdmin) {
      throw new UnauthorizedException();
    }

    return new LoggedAdminProfileRO(foundAdmin);
  }
}
