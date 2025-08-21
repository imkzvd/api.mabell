import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiCookieAuth, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Domain, App } from '@api.mabell/core';
import { CommandBus } from '@api.mabell/cqrs';
import { ParseObjectIdPipe } from '@api.mabell/shared';
import { Roles } from '../../decorators/roles.decorator';

@ApiTags('Session')
@ApiCookieAuth()
@Roles(Domain.Admin.AdminRoles.Owner, Domain.Admin.AdminRoles.Admin)
@Controller('/sessions')
export class SessionController {
  constructor(private readonly _commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Delete session by id', operationId: 'deleteSession' })
  @ApiNoContentResponse({ description: 'Session has been deleted', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteSession(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this._commandBus.execute(new App.CQRS.DeleteAdminRefreshTokenByIdCommand(id));
  }
}
