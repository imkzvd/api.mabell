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
import { App, Domain } from '@api.mabell/core';
import { CommandBus } from '@api.mabell/cqrs';
import { QueryBus } from '@api.mabell/cqrs';
import { ParseObjectIdPipe } from '@api.mabell/shared';
import { UpdateAlbumDTO } from './dtos/update-album.dto';
import { AlbumRO } from './ros/album.ro';
import { UpdateAlbumArtistsDTO } from './dtos/update-album-artists.dto';
import { UpdateAlbumCoverDTO } from './dtos/update-album-cover.dto';
import { CreateAlbumDTO } from './dtos/create-album.dto';
import { Roles } from '../../decorators/roles.decorator';
import { TracksRO } from '../track/ros/tracks.ro';

@ApiTags('Album')
@Roles(Domain.Admin.AdminRoles.Owner, Domain.Admin.AdminRoles.Admin)
@Controller({ path: '/albums' })
export class AlbumController {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Create an album', operationId: 'createAlbum' })
  @ApiBody({ type: CreateAlbumDTO })
  @ApiCreatedResponse({ description: 'Album', type: AlbumRO })
  @Post('/')
  async createAlbum(@Body() { artistId }: CreateAlbumDTO): Promise<AlbumRO> {
    const { id: createdAlbumId } = await this._commandBus.execute(
      new App.CQRS.CreateAlbumCommand(artistId),
    );
    const createdAlbum = await this._queryBus.execute(new App.CQRS.GetAlbumQuery(createdAlbumId));

    if (!createdAlbum) {
      throw new BadRequestException('Some error');
    }

    return new AlbumRO(createdAlbum);
  }

  @ApiOperation({ summary: 'Update album data', operationId: 'updateAlbum' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateAlbumDTO })
  @ApiOkResponse({ description: 'Album', type: AlbumRO })
  @Patch('/:id')
  async updateAlbum(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateAlbumDTO,
  ): Promise<AlbumRO> {
    await this._commandBus.execute(new App.CQRS.UpdateAlbumCommand(id, dto));

    const updatedAlbum = await this._queryBus.execute(new App.CQRS.GetAlbumQuery(id));

    if (!updatedAlbum) {
      throw new NotFoundException('Album not found');
    }

    return new AlbumRO(updatedAlbum);
  }

  @ApiOperation({ summary: 'Update artists of the album', operationId: 'updateAlbumArtists' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateAlbumArtistsDTO })
  @ApiOkResponse({ description: 'Album', type: AlbumRO })
  @Patch('/:id/artists')
  async updateAlbumArtists(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateAlbumArtistsDTO,
  ): Promise<AlbumRO> {
    await this._commandBus.execute(new App.CQRS.UpdateAlbumArtistsCommand(id, dto.artists));

    const updatedAlbum = await this._queryBus.execute(new App.CQRS.GetAlbumQuery(id));

    if (!updatedAlbum) {
      throw new NotFoundException('Album not found');
    }

    return new AlbumRO(updatedAlbum);
  }

  @ApiOperation({ summary: 'Update cover of the album', operationId: 'updateAlbumCover' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiBody({ type: UpdateAlbumCoverDTO })
  @ApiOkResponse({ description: 'Album', type: AlbumRO })
  @Patch('/:id/cover')
  async updateAlbumCover(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateAlbumCoverDTO,
  ): Promise<AlbumRO> {
    await this._commandBus.execute(new App.CQRS.UpdateAlbumCoverCommand(id, dto));

    const updatedAlbum = await this._queryBus.execute(new App.CQRS.GetAlbumQuery(id));

    if (!updatedAlbum) {
      throw new NotFoundException('Album not found');
    }

    return new AlbumRO(updatedAlbum);
  }

  @ApiOperation({ summary: 'Delete cover of the album', operationId: 'deleteAlbumCover' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'Album', type: AlbumRO })
  @Delete('/:id/cover')
  async deleteAlbumCover(@Param('id', ParseObjectIdPipe) id: string): Promise<AlbumRO> {
    await this._commandBus.execute(new App.CQRS.DeleteAlbumCoverCommand(id));

    const updatedAlbum = await this._queryBus.execute(new App.CQRS.GetAlbumQuery(id));

    if (!updatedAlbum) {
      throw new NotFoundException('Album not found');
    }

    return new AlbumRO(updatedAlbum);
  }

  @ApiOperation({ summary: 'Delete an album by id', operationId: 'deleteAlbum' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiNoContentResponse({ description: 'Album has been deleted', schema: { format: 'json' } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async deleteAlbum(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this._commandBus.execute(new App.CQRS.DeleteAlbumCommand(id));
  }

  @ApiOperation({ summary: 'Get an album by id', operationId: 'getAlbum' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @Roles(Domain.Admin.AdminRoles.Guest)
  @ApiOkResponse({ description: 'Album', type: AlbumRO })
  @Get('/:id')
  async getAlbum(@Param('id', ParseObjectIdPipe) id: string): Promise<AlbumRO> {
    const foundAlbum = await this._queryBus.execute(new App.CQRS.GetAlbumQuery(id));

    if (!foundAlbum) {
      throw new NotFoundException('Album does not exist');
    }

    return new AlbumRO(foundAlbum);
  }

  @ApiOperation({ summary: 'Get album tracks', operationId: 'getAlbumTracks' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiQuery({ required: false, type: Number, name: 'limit', description: 'Limit', example: 50 })
  @ApiQuery({ required: false, type: Number, name: 'offset', description: 'Offset', example: 0 })
  @ApiOkResponse({ description: 'Album tracks', type: TracksRO })
  @Roles(Domain.Admin.AdminRoles.Guest)
  @Get('/:id/tracks')
  async getAlbumTracks(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<TracksRO> {
    const foundTracks = await this._queryBus.execute(
      new App.CQRS.GetAlbumTracksQuery(id, { pagination: { limit, offset } }),
    );

    return new TracksRO(foundTracks);
  }
}
