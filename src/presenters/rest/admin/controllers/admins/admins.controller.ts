import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Param,
  NotFoundException,
  Patch,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AdminRO } from './ros/admin.ro';
import { AdminsRO } from './ros/admins.ro';
import { faker } from '@faker-js/faker';
import { ParseObjectIdPipe } from '../../../common/pipes/parse-object-id.pipe';
import { UpdateAdminUsernameDTO } from './dtos/update-admin-username.dto';
import { AdminRefreshedPasswordRO } from './ros/admin-refreshed-password.ro';
import { UpdateAdminDTO } from './dtos/update-admin.dto';
import { CreatedAdminWithPasswordRO } from './ros/created-admin-with-password.ro';
import { CreateAdminCommand } from '../../../../../core/app/components/admin/commands/create-admin/create-admin.command';
import { UpdateAdminCommand } from '../../../../../core/app/components/admin/commands/update-admin/update-admin.command';
import { UpdateAdminUsernameCommand } from '../../../../../core/app/components/admin/commands/update-admin-username/update-admin-username.command';
import { RefreshAdminPasswordCommand } from '../../../../../core/app/components/admin/commands/refresh-admin-password/refresh-admin-password.command';
import { DeleteAdminCommand } from '../../../../../core/app/components/admin/commands/delete-admin/delete-admin.command';
import { GetAdminsQuery } from '../../../../../core/app/components/admin/queries/get-admins/get-admins.query';
import { GetAdminQuery } from '../../../../../core/app/components/admin/queries/get-admin/get-admin.query';
import { OffsetLimitPaginationDTO } from '../../../../../core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';

@ApiTags('Admins')
@Controller('/admins')
export class AdminsController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Create an admin', operationId: 'create' })
  @ApiCreatedResponse({ type: CreatedAdminWithPasswordRO, description: 'Created admin' })
  @Post('/')
  async create(): Promise<CreatedAdminWithPasswordRO> {
    const { id, password } = await this._commandBus.execute(new CreateAdminCommand());
    const createdAdmin = await this._queryBus.execute(new GetAdminQuery(id));

    if (!createdAdmin) {
      throw new NotFoundException('Admin does not exist');
    }

    return new CreatedAdminWithPasswordRO(createdAdmin, password);
  }

  @ApiOperation({
    summary: 'Update admin data',
    operationId: 'update',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Admin id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateAdminDTO })
  @ApiOkResponse({ description: 'Admin has been updated', type: AdminRO })
  @Patch('/:id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateAdminDTO,
  ): Promise<AdminRO> {
    await this._commandBus.execute(new UpdateAdminCommand(id, dto));

    const updatedAdmin = await this._queryBus.execute(new GetAdminQuery(id));

    if (!updatedAdmin) {
      throw new NotFoundException('Admin does not exist');
    }

    return new AdminRO(updatedAdmin);
  }

  @ApiOperation({
    summary: 'Update admin username',
    operationId: 'updateUsername',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Admin id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateAdminUsernameDTO })
  @ApiOkResponse({ description: 'Admin username has been updated', type: AdminRO })
  @Patch('/:id/username')
  async updateUsername(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() { username }: UpdateAdminUsernameDTO,
  ): Promise<AdminRO> {
    await this._commandBus.execute(new UpdateAdminUsernameCommand(id, username));

    const updatedAdmin = await this._queryBus.execute(new GetAdminQuery(id));

    if (!updatedAdmin) {
      throw new NotFoundException('Admin does not exist');
    }

    return new AdminRO(updatedAdmin);
  }

  @ApiOperation({
    summary: 'Refresh admin password',
    operationId: 'refreshPassword',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Admin id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ type: AdminRefreshedPasswordRO })
  @Patch('/:id/password')
  async refreshPassword(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<AdminRefreshedPasswordRO> {
    const { password } = await this._commandBus.execute(new RefreshAdminPasswordCommand(id));

    return new AdminRefreshedPasswordRO(password);
  }

  @ApiOperation({ summary: 'Delete an admin by id', operationId: 'delete' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Admin id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiNoContentResponse({
    description: 'Admin has been deleted',
    schema: { format: 'json' },
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    return this._commandBus.execute(new DeleteAdminCommand(id));
  }

  @ApiOperation({ summary: 'Find admins', operationId: 'find' })
  @ApiQuery({
    required: false,
    type: Number,
    name: 'limit',
    description: 'Limit',
    example: 50,
    default: 50,
  })
  @ApiQuery({
    required: false,
    type: Number,
    name: 'offset',
    description: 'Offset',
    example: 10,
    default: 10,
  })
  @ApiOkResponse({ type: AdminsRO })
  @Get('/')
  async find(
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<AdminsRO> {
    const resp = await this._queryBus.execute(
      new GetAdminsQuery(new OffsetLimitPaginationDTO(limit, offset)),
    );

    return new AdminsRO(resp);
  }

  @ApiOperation({ summary: 'Find an admin by id', operationId: 'findOne' })
  @ApiOkResponse({ type: AdminRO })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Admin id',
    example: faker.database.mongodbObjectId(),
  })
  @Get('/:id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<AdminRO> {
    const foundAdmin = await this._queryBus.execute(new GetAdminQuery(id));

    if (!foundAdmin) {
      throw new NotFoundException(`There is no administrator with the specified ID`);
    }

    return new AdminRO(foundAdmin);
  }
}
