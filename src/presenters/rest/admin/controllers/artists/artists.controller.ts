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
import { UpdateArtistImageDTO } from './dtos/update-artist-image.dto';
import { UpdateArtistDTO } from './dtos/update-artist.dto';
import { BadRequestException } from '../../../../../core/shared/exceptions';
import { ParseObjectIdPipe } from '../../../common/pipes/parse-object-id.pipe';
import { TracksRO } from '../tracks/ros/tracks.ro';
import { AlbumsRO } from '../albums/ros/albums.ro';
import { CreateArtistCommand } from '../../../../../core/app/cqrs/artist/commands/create-artist/create-artist.command';
import { GetArtistQuery } from '../../../../../core/app/cqrs/artist/queries/get-artist/get-artist.query';
import { UpdateArtistCommand } from '../../../../../core/app/cqrs/artist/commands/update-artist/update-artist.command';
import { UpdateArtistAvatarCommand } from '../../../../../core/app/cqrs/artist/commands/update-artist-avatar/update-artist-avatar.command';
import { UpdateArtistCoverCommand } from '../../../../../core/app/cqrs/artist/commands/update-artist-cover/update-artist-cover.command';
import { DeleteArtistAvatarCommand } from '../../../../../core/app/cqrs/artist/commands/delete-artist-avatar/delete-artist-avatar.command';
import { DeleteArtistCoverCommand } from '../../../../../core/app/cqrs/artist/commands/delete-artist-cover/delete-artist-cover.command';
import { DeleteArtistCommand } from '../../../../../core/app/cqrs/artist/commands/delete-artist/delete-artist.command';
import { GetArtistAlbumsQuery } from '../../../../../core/app/cqrs/album/queries/get-artist-albums/get-artist-albums.query';
import { GetArtistTracksQuery } from '../../../../../core/app/cqrs/track/queries/get-artist-tracks/get-artist-tracks.query';

@ApiTags('Artists')
@Controller({ path: '/artists' })
export class ArtistsController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Create an artist', operationId: 'create' })
  @ApiCreatedResponse({ description: 'Artist', type: ArtistRO })
  @Post('/')
  async create(): Promise<ArtistRO> {
    const createdArtistId = await this._commandBus.execute(new CreateArtistCommand());
    const createdArtist = await this._queryBus.execute(new GetArtistQuery(createdArtistId));

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
    await this._commandBus.execute(new UpdateArtistCommand(id, dto));

    const updatedArtist = await this._queryBus.execute(new GetArtistQuery(id));

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
      new UpdateArtistAvatarCommand(id, {
        fileId,
        color,
      }),
    );

    const updatedArtist = await this._queryBus.execute(new GetArtistQuery(id));

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
      new UpdateArtistCoverCommand(id, {
        fileId,
        color,
      }),
    );

    const updatedArtist = await this._queryBus.execute(new GetArtistQuery(id));

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
    await this._commandBus.execute(new DeleteArtistAvatarCommand(id));

    const updatedArtist = await this._queryBus.execute(new GetArtistQuery(id));

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
    await this._commandBus.execute(new DeleteArtistCoverCommand(id));

    const updatedArtist = await this._queryBus.execute(new GetArtistQuery(id));

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
    await this._commandBus.execute(new DeleteArtistCommand(id));
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
    const foundArtist = await this._queryBus.execute(new GetArtistQuery(id));

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    return new ArtistRO(foundArtist);
  }

  @ApiOperation({ summary: 'Get artist albums', operationId: 'getAlbums' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiQuery({
    required: false,
    type: Number,
    name: 'limit',
    description: 'Limit',
    example: 50,
  })
  @ApiQuery({
    required: false,
    type: Number,
    name: 'offset',
    description: 'Offset',
    example: 0,
  })
  @ApiOkResponse({ description: 'Artist albums', type: AlbumsRO })
  @Get('/:id/albums')
  async getAlbums(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<AlbumsRO> {
    const foundAlbums = await this._queryBus.execute(
      new GetArtistAlbumsQuery(id, { pagination: { limit, offset } }),
    );

    return new AlbumsRO(foundAlbums);
  }

  @ApiOperation({ summary: 'Get artist tracks', operationId: 'getTracks' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiQuery({
    required: false,
    type: Number,
    name: 'limit',
    description: 'Limit',
    example: 50,
  })
  @ApiQuery({
    required: false,
    type: Number,
    name: 'offset',
    description: 'Offset',
    example: 0,
  })
  @ApiOkResponse({ description: 'Artist tracks', type: TracksRO })
  @Get('/:id/tracks')
  async getTracks(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<TracksRO> {
    const foundTracks = await this._queryBus.execute(
      new GetArtistTracksQuery(id, { pagination: { limit, offset } }),
    );

    return new TracksRO(foundTracks);
  }
}
