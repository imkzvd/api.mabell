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
import { AdminRoles } from '@core/domain/components/admin/constants/admin-roles';
import { CommandBus } from '@infrastructure/command-bus';
import { QueryBus } from '@infrastructure/query-bus';
import { CreateUserCommand } from '@core/app/cqrs/user/commands/create-user/create-user.command';
import { GetUserQuery } from '@core/app/cqrs/user/queries/get-user/get-user.query';
import { BadRequestException } from '@core/shared/exceptions';
import { ParseObjectIdPipe } from '@shared/pipes/parse-object-id.pipe';
import { UpdateUserCommand } from '@core/app/cqrs/user/commands/update-user/update-user.command';
import { UpdateUserUsernameCommand } from '@core/app/cqrs/user/commands/update-user-username/update-user-username.command';
import { UpdateUserEmailCommand } from '@core/app/cqrs/user/commands/update-user-email/update-user-email.command';
import { UpdateUserAvatarCommand } from '@core/app/cqrs/user/commands/update-user-avatar/update-user-avatar.command';
import { RefreshUserPasswordCommand } from '@core/app/cqrs/user/commands/refresh-user-password/refresh-user-password.command';
import { DeleteUserAvatarCommand } from '@core/app/cqrs/user/commands/delete-user-avatar/delete-user-avatar.command';
import { DeleteUserCommand } from '@core/app/cqrs/user/commands/delete-user/delete-user.command';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UpdateUserUsernameDTO } from './dtos/update-user-username.dto';
import { UpdateUserEmailDTO } from './dtos/update-user-email.dto';
import { UserRO } from './ros/user.ro';
import { UpdateUserAvatarDTO } from './dtos/update-user-avatar.dto';
import { Roles } from '../../decorators/roles.decorator';

@ApiTags('User')
@Roles(AdminRoles.Owner, AdminRoles.Admin)
@Controller({ path: '/users' })
export class UserController {
  constructor(
    private readonly _CB: CommandBus,
    private readonly _QB: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Create user', operationId: 'createUser' })
  @ApiCreatedResponse({ description: 'Id of the created user', type: UserRO })
  @Post('/')
  async createUser(): Promise<UserRO> {
    const createdUserId = await this._CB.execute(new CreateUserCommand());
    const createdUser = await this._QB.execute(new GetUserQuery(createdUserId));

    if (!createdUser) {
      throw new BadRequestException('Some error');
    }

    return new UserRO(createdUser);
  }

  @ApiOperation({ summary: 'Update user data', operationId: 'updateUser' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateUserDTO })
  @ApiOkResponse({ description: 'User has been updated', type: UserRO })
  @Patch('/:id')
  async updateUser(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateUserDTO,
  ): Promise<UserRO> {
    await this._CB.execute(new UpdateUserCommand(id, dto));

    const updatedUser = await this._QB.execute(new GetUserQuery(id));

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return new UserRO(updatedUser);
  }

  @ApiOperation({ summary: "Update user's username", operationId: 'updateUserUsername' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateUserUsernameDTO })
  @ApiOkResponse({ description: "User's username has been updated", type: UserRO })
  @Patch('/:id/username')
  async updateUserUsername(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() { username }: UpdateUserUsernameDTO,
  ): Promise<UserRO> {
    await this._CB.execute(new UpdateUserUsernameCommand(id, username));

    const updatedUser = await this._QB.execute(new GetUserQuery(id));

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return new UserRO(updatedUser);
  }

  @ApiOperation({ summary: "Update user's email", operationId: 'updateUserEmail' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateUserEmailDTO })
  @ApiOkResponse({ description: "User's email has been updated", type: UserRO })
  @Patch('/:id/email')
  async updateUserEmail(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() { email }: UpdateUserEmailDTO,
  ): Promise<UserRO> {
    await this._CB.execute(new UpdateUserEmailCommand(id, email));

    const updatedUser = await this._QB.execute(new GetUserQuery(id));

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return new UserRO(updatedUser);
  }

  @ApiOperation({ summary: "Update user's avatar", operationId: 'updateUserAvatar' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateUserAvatarDTO })
  @ApiOkResponse({ description: "User's avatar has been updated", type: UserRO })
  @Patch('/:id/avatar')
  async updateUserAvatar(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() { fileId, color }: UpdateUserAvatarDTO,
  ): Promise<UserRO> {
    await this._CB.execute(
      new UpdateUserAvatarCommand(id, {
        fileId,
        color,
      }),
    );

    const updatedUser = await this._QB.execute(new GetUserQuery(id));

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return new UserRO(updatedUser);
  }

  @ApiOperation({ summary: "Refresh user's password", operationId: 'refreshUserPassword' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiNoContentResponse({ description: 'Password has been reset', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('/:id/password/refresh')
  async refreshUserPassword(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this._CB.execute(new RefreshUserPasswordCommand(id));
  }

  @ApiOperation({ summary: "Delete user's avatar", operationId: 'deleteUserAvatar' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: "User's avatar has been deleted", type: UserRO })
  @Delete('/:id/avatar')
  async deleteUserAvatar(@Param('id', ParseObjectIdPipe) id: string): Promise<UserRO> {
    await this._CB.execute(new DeleteUserAvatarCommand(id));

    const updatedUser = await this._QB.execute(new GetUserQuery(id));

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return new UserRO(updatedUser);
  }

  @ApiOperation({ summary: 'Delete user', operationId: 'deleteUser' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiNoContentResponse({ description: 'User has been deleted', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteUser(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this._CB.execute(new DeleteUserCommand(id));
  }

  @ApiOperation({ summary: 'Get user by id', operationId: 'getUser' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'User', type: UserRO })
  @Roles(AdminRoles.Guest)
  @Get('/:id')
  async getUser(@Param('id', ParseObjectIdPipe) id: string): Promise<UserRO> {
    const foundUser = await this._QB.execute(new GetUserQuery(id));

    if (!foundUser) {
      throw new NotFoundException(`There is no user with the specified ID`);
    }

    return new UserRO(foundUser);
  }
}
