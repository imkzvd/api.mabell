import {
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { App } from '@api.mabell/core';
import { QueryBus } from '@api.mabell/cqrs';
import { ParseObjectIdPipe } from '@api.mabell/shared';
import { AlbumRO } from './ros/album.ro';
import { TracksRO } from '../track/ros/tracks.ro';

@ApiTags('Album')
@Controller({ path: '/albums' })
export class AlbumController {
  constructor(private readonly _queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Get albums by ids', operationId: 'getAlbumsByIds' })
  @ApiQuery({
    required: true,
    type: String,
    name: 'ids',
    description: 'Ids',
    example: `${faker.database.mongodbObjectId()},${faker.database.mongodbObjectId()}`,
  })
  @ApiOkResponse({
    description: 'Albums',
    schema: {
      type: 'array',
      items: {
        oneOf: [{ $ref: getSchemaPath(AlbumRO) }, { type: 'null' }],
      },
    },
  })
  @Get('/')
  async getAlbumsByIds(
    @Query('ids', new ParseArrayPipe()) ids: string[],
  ): Promise<(AlbumRO | null)[]> {
    const foundAlbums = await this._queryBus.execute(
      new App.CQRS.GetAlbumsByIdsQuery(ids, { isPublic: true }),
    );

    return foundAlbums.items.map((dto) => (dto ? new AlbumRO(dto) : null));
  }

  @ApiOperation({ summary: 'Get an album by id', operationId: 'getAlbum' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'Album', type: AlbumRO })
  @Get('/:id')
  async getAlbum(@Param('id', ParseObjectIdPipe) id: string): Promise<AlbumRO> {
    const foundAlbum = await this._queryBus.execute(
      new App.CQRS.GetAlbumQuery(id, {
        isPublic: true,
      }),
    );

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
  @Get('/:id/tracks')
  async getAlbumTracks(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<TracksRO> {
    const foundTracks = await this._queryBus.execute(
      new App.CQRS.GetAlbumTracksQuery(id, { pagination: { limit, offset }, isPublic: true }),
    );

    return new TracksRO(foundTracks);
  }
}
