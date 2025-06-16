import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiCookieAuth, ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../../../common/pipes/parse-object-id.pipe';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteRefreshTokenCommand } from '../../../../../core/app/cqrs/token/commands/delete-refresh-token/delete-refresh-token.command';

@ApiCookieAuth()
@Controller('/sessions')
export class SessionController {
  constructor(private readonly _commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Delete session by id', operationId: 'deleteSession' })
  @ApiNoContentResponse({ description: 'Session has been deleted', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteSession(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this._commandBus.execute(new DeleteRefreshTokenCommand(id));
  }
}
