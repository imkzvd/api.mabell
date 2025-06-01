import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { UpdateUserUsernameDTO } from './dtos/update-user-username.dto';
import { UpdateUserEmailDTO } from './dtos/update-user-email.dto';
import { UserRO } from './ros/user.ro';
import { UpdateUserAvatarDTO } from './dtos/update-user-avatar.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ParseObjectIdPipe } from '../../../common/pipes/parse-object-id.pipe';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { BadRequestException } from '../../../../../core/shared/exceptions';
import { CreateUserCommand } from '../../../../../core/app/cqrs/user/commands/create-user/create-user.command';
import { GetUserQuery } from '../../../../../core/app/cqrs/user/queries/get-user/get-user.query';
import { UpdateUserCommand } from '../../../../../core/app/cqrs/user/commands/update-user/update-user.command';
import { UpdateUserUsernameCommand } from '../../../../../core/app/cqrs/user/commands/update-user-username/update-user-username.command';
import { UpdateUserEmailCommand } from '../../../../../core/app/cqrs/user/commands/update-user-email/update-user-email.command';
import { UpdateUserAvatarCommand } from '../../../../../core/app/cqrs/user/commands/update-user-avatar/update-user-avatar.command';
import { RefreshUserPasswordCommand } from '../../../../../core/app/cqrs/user/commands/refresh-user-password/refresh-user-password.command';
import { DeleteUserAvatarCommand } from '../../../../../core/app/cqrs/user/commands/delete-user-avatar/delete-user-avatar.command';
import { DeleteUserCommand } from '../../../../../core/app/cqrs/user/commands/delete-user/delete-user.command';

@ApiTags('Users')
@Controller({ path: '/users' })
export class UsersController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Create user', operationId: 'create' })
  @ApiCreatedResponse({ description: 'Id of the created user', type: UserRO })
  @Post('/')
  async create(): Promise<UserRO> {
    const createdUserId = await this._commandBus.execute(new CreateUserCommand());
    const createdUser = await this._queryBus.execute(new GetUserQuery(createdUserId));

    if (!createdUser) {
      throw new BadRequestException('Some error');
    }

    return new UserRO(createdUser);
  }

  @ApiOperation({
    summary: 'Update user data',
    operationId: 'update',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateUserDTO })
  @ApiOkResponse({ description: 'User has been updated', type: UserRO })
  @Patch('/:id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateUserDTO,
  ): Promise<UserRO> {
    await this._commandBus.execute(new UpdateUserCommand(id, dto));

    const updatedUser = await this._queryBus.execute(new GetUserQuery(id));

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return new UserRO(updatedUser);
  }

  @ApiOperation({
    summary: "Update user's username",
    operationId: 'updateUsername',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateUserUsernameDTO })
  @ApiOkResponse({ description: "User's username has been updated", type: UserRO })
  @Patch('/:id/username')
  async updateUsername(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() { username }: UpdateUserUsernameDTO,
  ): Promise<UserRO> {
    await this._commandBus.execute(new UpdateUserUsernameCommand(id, username));

    const updatedUser = await this._queryBus.execute(new GetUserQuery(id));

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return new UserRO(updatedUser);
  }

  @ApiOperation({
    summary: "Update user's email",
    operationId: 'updateEmail',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateUserEmailDTO })
  @ApiOkResponse({ description: "User's email has been updated", type: UserRO })
  @Patch('/:id/email')
  async updateEmail(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() { email }: UpdateUserEmailDTO,
  ): Promise<UserRO> {
    await this._commandBus.execute(new UpdateUserEmailCommand(id, email));

    const updatedUser = await this._queryBus.execute(new GetUserQuery(id));

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return new UserRO(updatedUser);
  }

  @ApiOperation({
    summary: "Update user's avatar",
    operationId: 'updateAvatar',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateUserAvatarDTO })
  @ApiOkResponse({ description: "User's avatar has been updated", type: UserRO })
  @Patch('/:id/avatar')
  async updateAvatar(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() { fileId, color }: UpdateUserAvatarDTO,
  ): Promise<UserRO> {
    await this._commandBus.execute(
      new UpdateUserAvatarCommand(id, {
        fileId,
        color,
      }),
    );

    const updatedUser = await this._queryBus.execute(new GetUserQuery(id));

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return new UserRO(updatedUser);
  }

  @ApiOperation({
    summary: "Refresh user's password",
    operationId: 'refreshPassword',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiNoContentResponse({
    description: 'Password has been reset',
    schema: { format: 'json' },
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('/:id/password/refresh')
  async refreshPassword(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this._commandBus.execute(new RefreshUserPasswordCommand(id));
  }

  @ApiOperation({
    summary: "Delete user's avatar",
    operationId: 'deleteAvatar',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: "User's avatar has been deleted", type: UserRO })
  @Delete('/:id/avatar')
  async deleteAvatar(@Param('id', ParseObjectIdPipe) id: string): Promise<UserRO> {
    await this._commandBus.execute(new DeleteUserAvatarCommand(id));

    const updatedUser = await this._queryBus.execute(new GetUserQuery(id));

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return new UserRO(updatedUser);
  }

  @ApiOperation({
    summary: 'Delete user',
    operationId: 'delete',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiNoContentResponse({
    description: 'User has been deleted',
    schema: { format: 'json' },
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this._commandBus.execute(new DeleteUserCommand(id));
  }

  @ApiOperation({
    summary: 'Find user by id',
    operationId: 'findOne',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'User', type: UserRO })
  @Get('/:id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<UserRO> {
    const foundUser = await this._queryBus.execute(new GetUserQuery(id));

    if (!foundUser) {
      throw new NotFoundException(`There is no user with the specified ID`);
    }

    return new UserRO(foundUser);
  }
}
