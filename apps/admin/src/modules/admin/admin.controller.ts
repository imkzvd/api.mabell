import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
import { faker } from '@faker-js/faker';
import { AdminRoles } from '@core/domain/components/admin/constants/admin-roles';
import { CommandBus } from '@infrastructure/command-bus';
import { QueryBus } from '@infrastructure/query-bus';
import { CreateAdminCommand } from '@core/app/cqrs/admin/commands/create-admin/create-admin.command';
import { GetAdminQuery } from '@core/app/cqrs/admin/queries/get-admin/get-admin.query';
import { ParseObjectIdPipe } from '@shared/pipes/parse-object-id.pipe';
import { UpdateAdminCommand } from '@core/app/cqrs/admin/commands/update-admin/update-admin.command';
import { UpdateAdminUsernameCommand } from '@core/app/cqrs/admin/commands/update-admin-username/update-admin-username.command';
import { RefreshAdminPasswordCommand } from '@core/app/cqrs/admin/commands/refresh-admin-password/refresh-admin-password.command';
import { DeleteAdminCommand } from '@core/app/cqrs/admin/commands/delete-admin/delete-admin.command';
import { GetAdminsQuery } from '@core/app/cqrs/admin/queries/get-admins/get-admins.query';
import { OffsetLimitPaginationDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { AdminRO } from './ros/admin.ro';
import { AdminsRO } from './ros/admins.ro';
import { UpdateAdminUsernameDTO } from './dtos/update-admin-username.dto';
import { AdminRefreshedPasswordRO } from './ros/admin-refreshed-password.ro';
import { UpdateAdminDTO } from './dtos/update-admin.dto';
import { Roles } from '../../decorators/roles.decorator';

@ApiTags('Admin')
@Roles(AdminRoles.Owner)
@Controller('/admins')
export class AdminController {
  constructor(
    private readonly _CB: CommandBus,
    private readonly _QB: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Create an admin', operationId: 'createAdmin' })
  @ApiCreatedResponse({ type: AdminRO, description: 'Created admin' })
  @Post('/')
  async createAdmin(): Promise<AdminRO> {
    const createdAdminId = await this._CB.execute(new CreateAdminCommand());
    const createdAdmin = await this._QB.execute(new GetAdminQuery(createdAdminId));

    if (!createdAdmin) {
      throw new NotFoundException('Admin does not exist');
    }

    return new AdminRO(createdAdmin);
  }

  @ApiOperation({ summary: 'Update admin data', operationId: 'updateAdmin' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Admin id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateAdminDTO })
  @ApiOkResponse({ description: 'Admin has been updated', type: AdminRO })
  @Patch('/:id')
  async updateAdmin(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateAdminDTO,
  ): Promise<AdminRO> {
    await this._CB.execute(new UpdateAdminCommand(id, dto));

    const updatedAdmin = await this._QB.execute(new GetAdminQuery(id));

    if (!updatedAdmin) {
      throw new NotFoundException('Admin does not exist');
    }

    return new AdminRO(updatedAdmin);
  }

  @ApiOperation({ summary: 'Update admin username', operationId: 'updateAdminUsername' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Admin id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateAdminUsernameDTO })
  @ApiOkResponse({ description: 'Admin username has been updated', type: AdminRO })
  @Patch('/:id/username')
  async updateAdminUsername(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() { username }: UpdateAdminUsernameDTO,
  ): Promise<AdminRO> {
    await this._CB.execute(new UpdateAdminUsernameCommand(id, username));

    const updatedAdmin = await this._QB.execute(new GetAdminQuery(id));

    if (!updatedAdmin) {
      throw new NotFoundException('Admin does not exist');
    }

    return new AdminRO(updatedAdmin);
  }

  @ApiOperation({ summary: 'Refresh admin password', operationId: 'refreshAdminPassword' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Admin id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ type: AdminRefreshedPasswordRO })
  @Patch('/:id/password')
  async refreshAdminPassword(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<AdminRefreshedPasswordRO> {
    const { password } = await this._CB.execute(new RefreshAdminPasswordCommand(id));

    return new AdminRefreshedPasswordRO(password);
  }

  @ApiOperation({ summary: 'Delete an admin by id', operationId: 'deleteAdmin' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Admin id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiNoContentResponse({ description: 'Admin has been deleted', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteAdmin(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this._CB.execute(new DeleteAdminCommand(id));
  }

  @ApiOperation({ summary: 'Get admins', operationId: 'getAdmins' })
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
  async getAdmins(
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<AdminsRO> {
    const resp = await this._QB.execute(
      new GetAdminsQuery(new OffsetLimitPaginationDTO(limit, offset)),
    );

    return new AdminsRO(resp);
  }

  @ApiOperation({ summary: 'Get admin', operationId: 'getAdmin' })
  @ApiOkResponse({ type: AdminRO })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Admin id',
    example: faker.database.mongodbObjectId(),
  })
  @Get('/:id')
  async getAdmin(@Param('id', ParseObjectIdPipe) id: string): Promise<AdminRO> {
    const foundAdmin = await this._QB.execute(new GetAdminQuery(id));

    if (!foundAdmin) {
      throw new NotFoundException(`There is no administrator with the specified ID`);
    }

    return new AdminRO(foundAdmin);
  }
}
