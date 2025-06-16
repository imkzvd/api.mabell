import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { LoginAdminCommand } from '../../../../../core/app/cqrs/admin/commands/login-admin/login-admin.command';
import { LoginAdminDTO } from './dtos/login-admin.dto';

@ApiTags('Login')
@Controller('/login')
export class LoginController {
  constructor(private readonly _commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Admin login', operationId: 'login' })
  @ApiBody({ type: LoginAdminDTO })
  @ApiNoContentResponse({ description: 'Success login', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/')
  async login(@Body() dto: LoginAdminDTO): Promise<void> {
    await this._commandBus.execute(new LoginAdminCommand(dto));
  }
}
