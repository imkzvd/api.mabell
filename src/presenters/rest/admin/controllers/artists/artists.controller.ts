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
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ArtistRO } from './ros/artist.ro';
import { ArtistsRO } from './ros/artists.ro';
import { CreateArtistDTO } from './dtos/create-artist.dto';
import { UpdateArtistImageDTO } from './dtos/update-artist-image.dto';
import { UpdateArtistDTO } from './dtos/update-artist.dto';
import { CreateArtistCommand } from '../../../../../core/app/components/artist/commands/create-artist/create-artist.command';
import { GetArtistByIdQuery } from '../../../../../core/app/components/artist/queries/get-artist-by-id/get-artist-by-id.query';
import { BadRequestException } from '../../../../../core/shared/exceptions';
import { ParseObjectIdPipe } from '../../../common/pipes/parse-object-id.pipe';
import { UpdateArtistByIdCommand } from '../../../../../core/app/components/artist/commands/update-artist-by-id/update-artist-by-id.command';
import { UpdateArtistAvatarByIdCommand } from '../../../../../core/app/components/artist/commands/update-artist-avatar-by-id/update-artist-avatar-by-id.command';
import { UpdateArtistCoverByIdCommand } from '../../../../../core/app/components/artist/commands/update-artist-cover-by-id/update-artist-cover-by-id.command';
import { DeleteArtistAvatarByIdCommand } from '../../../../../core/app/components/artist/commands/delete-artist-avatar-by-id/delete-artist-avatar-by-id.command';
import { DeleteArtistCoverByIdCommand } from '../../../../../core/app/components/artist/commands/delete-artist-cover-by-id/delete-artist-cover-by-id.command';
import { DeleteArtistByIdCommand } from '../../../../../core/app/components/artist/commands/delete-artist-by-id/delete-artist-by-id.command';
import { GetArtistsQuery } from '../../../../../core/app/components/artist/queries/get-artists/get-artists.query';
import { OffsetLimitPaginationDTO } from '../../../../../core/app/common/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';

@ApiTags('Artists')
@Controller({ path: '/artists' })
export class ArtistsController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Create an artist', operationId: 'create' })
  @ApiBody({ type: CreateArtistDTO })
  @ApiCreatedResponse({ description: 'Artist', type: ArtistRO })
  @Post('/')
  async create(@Body() { name }: CreateArtistDTO): Promise<ArtistRO> {
    const { id } = await this._commandBus.execute(new CreateArtistCommand(name));

    const createdArtist = await this._queryBus.execute(new GetArtistByIdQuery(id));

    if (!createdArtist) {
      throw new BadRequestException('Some error');
    }

    return new ArtistRO(createdArtist);
  }

  @ApiOperation({
    summary: 'Update artist data',
    operationId: 'update',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateArtistDTO })
  @ApiOkResponse({ description: 'Artist', type: ArtistRO })
  @Patch('/:id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateArtistDTO,
  ): Promise<ArtistRO> {
    await this._commandBus.execute(new UpdateArtistByIdCommand(id, dto));

    const updatedArtist = await this._queryBus.execute(new GetArtistByIdQuery(id));

    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }

    return new ArtistRO(updatedArtist);
  }

  @ApiOperation({
    summary: "Update artist's avatar",
    operationId: 'updateAvatar',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateArtistImageDTO })
  @ApiOkResponse({ description: 'Artist', type: ArtistRO })
  @Patch('/:id/avatar')
  async updateAvatar(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() { fileId, color }: UpdateArtistImageDTO,
  ): Promise<ArtistRO> {
    await this._commandBus.execute(
      new UpdateArtistAvatarByIdCommand(id, {
        fileId,
        accentColor: color,
      }),
    );

    const updatedArtist = await this._queryBus.execute(new GetArtistByIdQuery(id));

    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }

    return new ArtistRO(updatedArtist);
  }

  @ApiOperation({
    summary: "Update artist's cover",
    operationId: 'updateCover',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateArtistImageDTO })
  @ApiOkResponse({ description: 'Artist', type: ArtistRO })
  @Patch('/:id/cover')
  async updateCover(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() { fileId, color }: UpdateArtistImageDTO,
  ): Promise<ArtistRO> {
    await this._commandBus.execute(
      new UpdateArtistCoverByIdCommand(id, {
        fileId,
        secondaryColor: color,
      }),
    );

    const updatedArtist = await this._queryBus.execute(new GetArtistByIdQuery(id));

    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }

    return new ArtistRO(updatedArtist);
  }

  @ApiOperation({
    summary: "Delete artist's avatar",
    operationId: 'deleteAvatar',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: "Artist's avatar has been deleted", type: ArtistRO })
  @Delete('/:id/avatar')
  async deleteAvatar(@Param('id', ParseObjectIdPipe) id: string): Promise<ArtistRO> {
    await this._commandBus.execute(new DeleteArtistAvatarByIdCommand(id));

    const updatedArtist = await this._queryBus.execute(new GetArtistByIdQuery(id));

    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }

    return new ArtistRO(updatedArtist);
  }

  @ApiOperation({
    summary: "Delete artist's cover",
    operationId: 'deleteCover',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: "Artist's cover has been deleted", type: ArtistRO })
  @Delete('/:id/cover')
  async deleteCover(@Param('id', ParseObjectIdPipe) id: string): Promise<ArtistRO> {
    await this._commandBus.execute(new DeleteArtistCoverByIdCommand(id));

    const updatedArtist = await this._queryBus.execute(new GetArtistByIdQuery(id));

    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }

    return new ArtistRO(updatedArtist);
  }

  @ApiOperation({
    summary: 'Delete an artist by id',
    operationId: 'delete',
  })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiNoContentResponse({
    description: 'Artist has been deleted',
    schema: { format: 'json' },
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    return this._commandBus.execute(new DeleteArtistByIdCommand(id));
  }

  @ApiOperation({ summary: 'Find artists', operationId: 'find' })
  @ApiQuery({
    required: false,
    type: Number,
    name: 'limit',
    description: 'Limit',
    example: 25,
  })
  @ApiQuery({
    required: false,
    type: Number,
    name: 'offset',
    description: 'Offset',
    example: 0,
  })
  @ApiOkResponse({ type: ArtistsRO })
  @Get('/')
  async find(
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<ArtistsRO> {
    const result = await this._queryBus.execute(
      new GetArtistsQuery(new OffsetLimitPaginationDTO(limit, offset)),
    );

    return new ArtistsRO(result);
  }

  @ApiOperation({ summary: 'Find an artist by id', operationId: 'findOne' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'Artist', type: ArtistRO })
  @Get('/:id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string): Promise<ArtistRO> {
    const foundArtist = await this._queryBus.execute(new GetArtistByIdQuery(id));

    if (!foundArtist) {
      throw new NotFoundException(`There is no artist with the specified ID`);
    }

    return new ArtistRO(foundArtist);
  }
}
