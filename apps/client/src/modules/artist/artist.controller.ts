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
import { ArtistRO } from './ros/artist.ro';
import { App } from '@api.mabell/core';
import { QueryBus } from '@api.mabell/cqrs';
import { ParseObjectIdPipe } from '@api.mabell/shared';
import { TracksRO } from '../track/ros/tracks.ro';
import { SimplifiedAlbumsRO } from '../album/ros/simplified-albums.ro';
import { AlbumRO } from '../album/ros/album.ro';

@ApiTags('Artists')
@Controller({ path: '/artists' })
export class ArtistController {
  constructor(private readonly _QB: QueryBus) {}

  @ApiOperation({ summary: 'Get artists by ids', operationId: 'getArtistsByIds' })
  @ApiQuery({
    required: true,
    type: String,
    name: 'ids',
    description: 'Ids',
    example: `${faker.database.mongodbObjectId()},${faker.database.mongodbObjectId()}`,
  })
  @ApiOkResponse({
    description: 'Artists',
    schema: {
      type: 'array',
      items: {
        oneOf: [{ $ref: getSchemaPath(ArtistRO) }, { type: 'null' }],
      },
    },
  })
  @Get('/')
  async getArtistsByIds(
    @Query('ids', new ParseArrayPipe()) ids: string[],
  ): Promise<(ArtistRO | null)[]> {
    const foundArtist = await this._QB.execute(
      new App.CQRS.GetArtistsByIdsQuery(ids, { isPublic: true }),
    );

    return foundArtist.items.map((dto) => (dto ? new ArtistRO(dto) : null));
  }

  @ApiOperation({ summary: 'Get an artist by id', operationId: 'getArtist' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'Artist', type: ArtistRO })
  @Get('/:id')
  async getArtist(@Param('id', ParseObjectIdPipe) id: string): Promise<ArtistRO> {
    const foundArtist = await this._QB.execute(new App.CQRS.GetArtistQuery(id, { isPublic: true }));

    if (!foundArtist) {
      throw new NotFoundException('Artist does not exist');
    }

    return new ArtistRO(foundArtist);
  }

  @ApiOperation({ summary: 'Get artist public albums', operationId: 'getArtistAlbums' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiQuery({ required: false, type: Number, name: 'limit', description: 'Limit', example: 50 })
  @ApiQuery({ required: false, type: Number, name: 'offset', description: 'Offset', example: 0 })
  @ApiOkResponse({ description: 'Albums', type: SimplifiedAlbumsRO })
  @Get('/:id/albums')
  async getArtistAlbums(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<SimplifiedAlbumsRO> {
    const foundAlbums = await this._QB.execute(
      new App.CQRS.GetArtistAlbumsQuery(id, {
        isPublic: true,
        pagination: { limit, offset },
      }),
    );

    return new SimplifiedAlbumsRO(foundAlbums);
  }

  @ApiOperation({ summary: 'Get artist public tracks', operationId: 'getArtistTracks' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiQuery({ required: false, type: Number, name: 'limit', description: 'Limit', example: 50 })
  @ApiQuery({ required: false, type: Number, name: 'offset', description: 'Offset', example: 0 })
  @ApiOkResponse({ description: 'Tracks', type: TracksRO })
  @Get('/:id/tracks')
  async getArtistTracks(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<TracksRO> {
    const foundTracks = await this._QB.execute(
      new App.CQRS.GetArtistTracksQuery(id, {
        isPublic: true,
        pagination: { limit, offset },
      }),
    );

    return new TracksRO(foundTracks);
  }

  @ApiOperation({ summary: 'Get artist latest release', operationId: 'getLatestRelease' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'Album', type: AlbumRO })
  @Get('/:id/latest-release')
  async getLatestRelease(@Param('id', ParseObjectIdPipe) id: string): Promise<AlbumRO | null> {
    const foundAlbum = await this._QB.execute(
      new App.CQRS.GetArtistLatestAlbumQuery(id, { isPublic: true }),
    );

    return foundAlbum ? new AlbumRO(foundAlbum) : null;
  }

  @ApiOperation({ summary: 'Get similar artists', operationId: 'getSimilarArtists' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'Artists', type: [ArtistRO] })
  @Get('/:id/similar')
  async getSimilarArtists(@Param('id', ParseObjectIdPipe) id: string): Promise<ArtistRO[]> {
    const foundArtists = await this._QB.execute(
      new App.CQRS.GetSimilarArtistsQuery(id, { isPublic: true, limit: 10 }),
    );

    return foundArtists.map((i) => new ArtistRO(i));
  }
}
