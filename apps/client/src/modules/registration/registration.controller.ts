import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';
import { UserRO } from '../user/ros/user.ro';
import { RegisterUserDTO } from './dtos/register-user.dto';

@ApiTags('Registration')
@Controller({ path: '/registration' })
export class RegistrationController {
  constructor(
    private readonly _CB: CommandBus,
    private readonly _QB: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Register user', operationId: 'registerUser' })
  @ApiBody({ type: RegisterUserDTO })
  @ApiCreatedResponse({ description: 'Reg. user', type: UserRO })
  @Post('/')
  async registerUser(@Body() dto: RegisterUserDTO): Promise<UserRO> {
    const { id: registeredUserId } = await this._CB.execute(new App.CQRS.RegisterUserCommand(dto));
    const registeredUser = await this._QB.execute(new App.CQRS.GetUserQuery(registeredUserId));

    if (!registeredUser) {
      throw new BadRequestException('Some error');
    }

    return new UserRO(registeredUser);
  }
}
