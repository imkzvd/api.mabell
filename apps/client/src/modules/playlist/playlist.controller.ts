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
import { QueryBus } from '@api.mabell/cqrs';
import { App } from '@api.mabell/core';
import { ParseObjectIdPipe } from '@api.mabell/shared';
import { PlaylistRO } from './ros/playlist.ro';
import { PlaylistTracksRO } from '../track/ros/playlist-tracks.ro';

@ApiTags('Playlist')
@Controller({ path: '/playlists' })
export class PlaylistController {
  constructor(private readonly _queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Get playlist by id', operationId: 'getPlaylist' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiOkResponse({ description: 'Playlist', type: PlaylistRO })
  @Get('/:id')
  async getPlaylist(@Param('id', ParseObjectIdPipe) id: string): Promise<PlaylistRO> {
    const foundPlaylist = await this._queryBus.execute(
      new App.CQRS.GetPlaylistQuery(id, { isPublic: true }),
    );

    if (!foundPlaylist) {
      throw new NotFoundException(`The playlists does not exist`);
    }

    return new PlaylistRO(foundPlaylist);
  }

  @ApiOperation({ summary: 'Get playlist tracks', operationId: 'getPlaylistTracks' })
  @ApiParam({
    type: String,
    name: 'id',
    description: 'Id',
    example: faker.database.mongodbObjectId(),
  })
  @ApiQuery({ required: false, type: String, name: 'limit', description: 'Limit', example: 50 })
  @ApiQuery({ required: false, type: String, name: 'offset', description: 'Offset', example: 0 })
  @ApiOkResponse({ description: 'Playlist tracks', type: PlaylistTracksRO })
  @Get('/:id/tracks')
  async getPlaylistTracks(
    @Param('id', ParseObjectIdPipe) id: string,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<PlaylistTracksRO> {
    const foundTracks = await this._queryBus.execute(
      new App.CQRS.GetPlaylistTracksQuery(id, { isPublic: true, pagination: { limit, offset } }),
    );

    return new PlaylistTracksRO(foundTracks);
  }
}
