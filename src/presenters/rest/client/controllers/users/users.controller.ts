import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { UserRO } from './ros/user.ro';
import { QueryBus } from '@nestjs/cqrs';
import { ParseObjectIdPipe } from '../../../common/pipes/parse-object-id.pipe';
import { GetUserQuery } from '../../../../../core/app/cqrs/user/queries/get-user/get-user.query';

@ApiTags('Users')
@Controller({ path: '/users' })
export class UsersController {
  constructor(private readonly _queryBus: QueryBus) {}

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
    const foundUser = await this._queryBus.execute(new GetUserQuery(id, { isPublic: true }));

    if (!foundUser || foundUser.isBlocked) {
      throw new NotFoundException(`There is no user with the specified ID`);
    }

    return new UserRO(foundUser);
  }
}
