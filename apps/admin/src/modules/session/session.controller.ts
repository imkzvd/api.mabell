import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiCookieAuth, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@infrastructure/command-bus';
import { AdminRoles } from '@core/domain/components/admin/constants/admin-roles';
import { ParseObjectIdPipe } from '@shared/pipes/parse-object-id.pipe';
import { Roles } from '../../decorators/roles.decorator';
import { DeleteAdminRefreshTokenByIdCommand } from '@core/app/cqrs/token/commands/delete-admin-refresh-token-by-id/delete-admin-refresh-token-by-id.command';

@ApiTags('Session')
@ApiCookieAuth()
@Roles(AdminRoles.Owner, AdminRoles.Admin)
@Controller('/sessions')
export class SessionController {
  constructor(private readonly _commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Delete session by id', operationId: 'deleteSession' })
  @ApiNoContentResponse({ description: 'Session has been deleted', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteSession(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this._commandBus.execute(new DeleteAdminRefreshTokenByIdCommand(id));
  }
}
