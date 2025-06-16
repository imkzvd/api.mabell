import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiNoContentResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { LoginUserDTO } from './dtos/login-user.dto';
import { LoginUserCommand } from '../../../../../core/app/cqrs/user/commands/login-user/login-user.command';

@ApiTags('Login')
@Controller('/login')
export class LoginController {
  constructor(private readonly _commandBus: CommandBus) {}

  @ApiOperation({ summary: 'User login', operationId: 'login' })
  @ApiBody({ type: LoginUserDTO })
  @ApiNoContentResponse({ description: 'Success login', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/')
  async login(@Body() dto: LoginUserDTO): Promise<void> {
    await this._commandBus.execute(new LoginUserCommand(dto));
  }
}
