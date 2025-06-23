import {
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { QueryBus } from '@nestjs/cqrs';
import { ArtistRO } from './ros/artist.ro';
import { ParseObjectIdPipe } from '../../../common/pipes/parse-object-id.pipe';
import { AlbumsRO } from '../../../admin/controllers/albums/ros/albums.ro';
import { TracksRO } from '../../../admin/controllers/tracks/ros/tracks.ro';
import { GetArtistQuery } from '../../../../../core/app/cqrs/artist/queries/get-artist/get-artist.query';
import { GetArtistPublicStatusQuery } from '../../../../../core/app/cqrs/artist/queries/get-artist-public-status/get-artist-public-status.query';
import { GetArtistAlbumsQuery } from '../../../../../core/app/cqrs/album/queries/get-artist-albums/get-artist-albums.query';
import { GetArtistTracksQuery } from '../../../../../core/app/cqrs/track/queries/get-artist-tracks/get-artist-tracks.query';

@ApiTags('Artists')
@Controller({ path: '/artist' })
export class ArtistsController {
  constructor(private readonly _queryBus: QueryBus) {}

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
    const foundArtist = await this._queryBus.execute(new GetArtistQuery(id, { isPublic: true }));

    if (!foundArtist) {
      throw new NotFoundException(`There is no artist with the specified ID`);
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
  @ApiQuery({ required: false, type: Number, description: 'Limit', example: 25, default: 50 })
  @ApiQuery({ required: false, type: Number, description: 'Offset', example: 10, default: 0 })
  @ApiOkResponse({ description: 'Albums', type: AlbumsRO })
  @Get('/:id/albums')
  async getArtistAlbums(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<AlbumsRO> {
    const isArtistPublic = await this._queryBus.execute(new GetArtistPublicStatusQuery(id));

    if (!isArtistPublic) {
      throw new NotFoundException(`There is no artist with the specified ID`);
    }

    const foundAlbums = await this._queryBus.execute(
      new GetArtistAlbumsQuery(id, {
        isPublic: true,
        pagination: { limit, offset },
      }),
    );

    return new AlbumsRO(foundAlbums);
  }

  @ApiOperation({ summary: 'Get artist public tracks', operationId: 'getArtistTracks' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiQuery({ required: false, type: Number, description: 'Limit', example: 25, default: 50 })
  @ApiQuery({ required: false, type: Number, description: 'Offset', example: 10, default: 0 })
  @ApiOkResponse({ description: 'Tracks', type: TracksRO })
  @Get('/:id/tracks')
  async getArtistTracks(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<TracksRO> {
    const isArtistPublic = await this._queryBus.execute(new GetArtistPublicStatusQuery(id));

    if (!isArtistPublic) {
      throw new NotFoundException(`There is no artist with the specified ID`);
    }

    const foundTracks = await this._queryBus.execute(
      new GetArtistTracksQuery(id, {
        isPublic: true,
        pagination: { limit, offset },
      }),
    );

    return new TracksRO(foundTracks);
  }
}
