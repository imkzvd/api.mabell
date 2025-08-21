import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { App } from '@api.mabell/core';
import { QueryBus } from '@api.mabell/cqrs';
import { ParseObjectIdPipe } from '@api.mabell/shared';
import { UserRO } from './ros/user.ro';

@ApiTags('User')
@Controller({ path: '/users' })
export class UserController {
  constructor(private readonly _QB: QueryBus) {}

  @ApiOperation({ summary: 'Get user by id', operationId: 'getUser' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'User', type: UserRO })
  @Get('/:id')
  async getUser(@Param('id', ParseObjectIdPipe) id: string): Promise<UserRO> {
    const foundUser = await this._QB.execute(new App.CQRS.GetUserQuery(id));

    if (!foundUser || foundUser.isBlocked) {
      throw new NotFoundException(`There is no user with the specified ID`);
    }

    return new UserRO(foundUser);
  }
}
