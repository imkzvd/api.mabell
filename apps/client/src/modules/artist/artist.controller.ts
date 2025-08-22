import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { ArtistRO } from './ros/artist.ro';
import { App } from '@api.mabell/core';
import { QueryBus } from '@api.mabell/cqrs';
import { ParseObjectIdPipe } from '@api.mabell/shared';

@ApiTags('Artists')
@Controller({ path: '/artists' })
export class ArtistController {
  constructor(private readonly _QB: QueryBus) {}

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

  // @ApiOperation({ summary: 'Get artist public albums', operationId: 'getArtistAlbums' })
  // @ApiParam({
  //   type: String,
  //   name: 'id',
  //   description: 'Id',
  //   example: faker.database.mongodbObjectId(),
  // })
  // @ApiQuery({ required: false, type: Number, description: 'Limit', example: 25, default: 50 })
  // @ApiQuery({ required: false, type: Number, description: 'Offset', example: 10, default: 0 })
  // @ApiOkResponse({ description: 'Albums', type: AlbumsRO })
  // @Get('/:id/albums')
  // async getArtistAlbums(
  //   @Param('id', ParseObjectIdPipe) id: string,
  //   @QueryTypes('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  //   @QueryTypes('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  // ): Promise<AlbumsRO> {
  //   const isArtistPublic = await this._QB.execute(new GetArtistPublicStatusQuery(id));
  //
  //   if (!isArtistPublic) {
  //     throw new NotFoundException(`There is no artist with the specified ID`);
  //   }
  //
  //   const foundAlbums = await this._QB.execute(
  //     new GetArtistAlbumsQuery(id, {
  //       isPublic: true,
  //       pagination: { limit, offset },
  //     }),
  //   );
  //
  //   return new AlbumsRO(foundAlbums);
  // }
  //
  // @ApiOperation({ summary: 'Get artist public tracks', operationId: 'getArtistTracks' })
  // @ApiParam({
  //   type: String,
  //   name: 'id',
  //   description: 'Id',
  //   example: faker.database.mongodbObjectId(),
  // })
  // @ApiQuery({ required: false, type: Number, description: 'Limit', example: 25, default: 50 })
  // @ApiQuery({ required: false, type: Number, description: 'Offset', example: 10, default: 0 })
  // @ApiOkResponse({ description: 'Tracks', type: TracksRO })
  // @Get('/:id/tracks')
  // async getArtistTracks(
  //   @Param('id', ParseObjectIdPipe) id: string,
  //   @QueryTypes('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  //   @QueryTypes('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  // ): Promise<TracksRO> {
  //   const isArtistPublic = await this._QB.execute(new GetArtistPublicStatusQuery(id));
  //
  //   if (!isArtistPublic) {
  //     throw new NotFoundException(`There is no artist with the specified ID`);
  //   }
  //
  //   const foundTracks = await this._QB.execute(
  //     new GetArtistTracksQuery(id, {
  //       isPublic: true,
  //       pagination: { limit, offset },
  //     }),
  //   );
  //
  //   return new TracksRO(foundTracks);
  // }
}
