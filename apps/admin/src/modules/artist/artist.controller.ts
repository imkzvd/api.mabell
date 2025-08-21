import {
  BadRequestException,
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
import { Domain, App } from '@api.mabell/core';
import { CommandBus } from '@api.mabell/cqrs';
import { QueryBus } from '@api.mabell/cqrs';
import { ParseObjectIdPipe } from '@api.mabell/shared';
import { ArtistRO } from './ros/artist.ro';
import { UpdateArtistImageDTO } from './dtos/update-artist-image.dto';
import { UpdateArtistDTO } from './dtos/update-artist.dto';
import { Roles } from '../../decorators/roles.decorator';
import { AlbumsRO } from '../album/ros/albums.ro';
import { TracksRO } from '../track/ros/tracks.ro';

@ApiTags('Artist')
@Roles(Domain.Admin.AdminRoles.Owner, Domain.Admin.AdminRoles.Admin)
@Controller({ path: '/artists' })
export class ArtistController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Create an artist', operationId: 'createArtist' })
  @ApiCreatedResponse({ description: 'Artist', type: ArtistRO })
  @Post('/')
  async createArtist(): Promise<ArtistRO> {
    const { id: createdArtistId } = await this._commandBus.execute(
      new App.CQRS.CreateArtistCommand(),
    );
    const createdArtist = await this._queryBus.execute(
      new App.CQRS.GetArtistQuery(createdArtistId),
    );

    if (!createdArtist) {
      throw new BadRequestException('Some error');
    }

    return new ArtistRO(createdArtist);
  }

  @ApiOperation({ summary: 'Update artist data', operationId: 'updateArtist' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateArtistDTO })
  @ApiOkResponse({ description: 'Artist', type: ArtistRO })
  @Patch('/:id')
  async updateArtist(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateArtistDTO,
  ): Promise<ArtistRO> {
    await this._commandBus.execute(new App.CQRS.UpdateArtistCommand(id, dto));

    const updatedArtist = await this._queryBus.execute(new App.CQRS.GetArtistQuery(id));

    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }

    return new ArtistRO(updatedArtist);
  }

  @ApiOperation({ summary: "Update artist's avatar", operationId: 'updateArtistAvatar' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateArtistImageDTO })
  @ApiOkResponse({ description: 'Artist', type: ArtistRO })
  @Patch('/:id/avatar')
  async updateArtistAvatar(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() { fileId, color }: UpdateArtistImageDTO,
  ): Promise<ArtistRO> {
    await this._commandBus.execute(
      new App.CQRS.UpdateArtistAvatarCommand(id, {
        fileId,
        color,
      }),
    );

    const updatedArtist = await this._queryBus.execute(new App.CQRS.GetArtistQuery(id));

    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }

    return new ArtistRO(updatedArtist);
  }

  @ApiOperation({ summary: "Update artist's cover", operationId: 'updateArtistCover' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateArtistImageDTO })
  @ApiOkResponse({ description: 'Artist', type: ArtistRO })
  @Patch('/:id/cover')
  async updateArtistCover(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() { fileId, color }: UpdateArtistImageDTO,
  ): Promise<ArtistRO> {
    await this._commandBus.execute(
      new App.CQRS.UpdateArtistCoverCommand(id, {
        fileId,
        color,
      }),
    );

    const updatedArtist = await this._queryBus.execute(new App.CQRS.GetArtistQuery(id));

    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }

    return new ArtistRO(updatedArtist);
  }

  @ApiOperation({ summary: "Delete artist's avatar", operationId: 'deleteArtistAvatar' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: "Artist's avatar has been deleted", type: ArtistRO })
  @Delete('/:id/avatar')
  async deleteArtistAvatar(@Param('id', ParseObjectIdPipe) id: string): Promise<ArtistRO> {
    await this._commandBus.execute(new App.CQRS.DeleteArtistAvatarCommand(id));

    const updatedArtist = await this._queryBus.execute(new App.CQRS.GetArtistQuery(id));

    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }

    return new ArtistRO(updatedArtist);
  }

  @ApiOperation({ summary: "Delete artist's cover", operationId: 'deleteArtistCover' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: "Artist's cover has been deleted", type: ArtistRO })
  @Delete('/:id/cover')
  async deleteArtistCover(@Param('id', ParseObjectIdPipe) id: string): Promise<ArtistRO> {
    await this._commandBus.execute(new App.CQRS.DeleteArtistCoverCommand(id));

    const updatedArtist = await this._queryBus.execute(new App.CQRS.GetArtistQuery(id));

    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }

    return new ArtistRO(updatedArtist);
  }

  @ApiOperation({ summary: 'Delete an artist by id', operationId: 'deleteArtist' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiNoContentResponse({ description: 'Artist has been deleted', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteArtist(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this._commandBus.execute(new App.CQRS.DeleteArtistCommand(id));
  }

  @ApiOperation({ summary: 'Get an artist by id', operationId: 'getArtist' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'Artist', type: ArtistRO })
  @Roles(Domain.Admin.AdminRoles.Guest)
  @Get('/:id')
  async getArtist(@Param('id', ParseObjectIdPipe) id: string): Promise<ArtistRO> {
    const foundArtist = await this._queryBus.execute(new App.CQRS.GetArtistQuery(id));

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    return new ArtistRO(foundArtist);
  }

  @ApiOperation({ summary: 'Create album', operationId: 'createAlbum' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({
    description: 'Album Id',
    schema: { properties: { albumId: { type: 'string' } }, required: ['albumId'] },
  })
  @Post('/:id/albums')
  async createAlbum(@Param('id', ParseObjectIdPipe) id: string): Promise<{
    albumId: string;
  }> {
    const { id: createdAlbumId } = await this._commandBus.execute(
      new App.CQRS.CreateAlbumCommand(id),
    );

    return {
      albumId: createdAlbumId,
    };
  }

  @ApiOperation({ summary: 'Get artist albums', operationId: 'getArtistAlbums' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiQuery({ required: false, type: Number, name: 'limit', description: 'Limit', example: 50 })
  @ApiQuery({ required: false, type: Number, name: 'offset', description: 'Offset', example: 0 })
  @ApiOkResponse({ description: 'Artist albums', type: AlbumsRO })
  @Roles(Domain.Admin.AdminRoles.Guest)
  @Get('/:id/albums')
  async getArtistAlbums(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<AlbumsRO> {
    const foundAlbums = await this._queryBus.execute(
      new App.CQRS.GetArtistAlbumsQuery(id, { pagination: { limit, offset } }),
    );

    return new AlbumsRO(foundAlbums);
  }

  @ApiOperation({ summary: 'Get artist tracks', operationId: 'getArtistTracks' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiQuery({ required: false, type: Number, name: 'limit', description: 'Limit', example: 50 })
  @ApiQuery({ required: false, type: Number, name: 'offset', description: 'Offset', example: 0 })
  @ApiOkResponse({ description: 'Artist tracks', type: TracksRO })
  @Roles(Domain.Admin.AdminRoles.Guest)
  @Get('/:id/tracks')
  async getArtistTracks(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<TracksRO> {
    const foundTracks = await this._queryBus.execute(
      new App.CQRS.GetArtistTracksQuery(id, { pagination: { limit, offset } }),
    );

    return new TracksRO(foundTracks);
  }
}
