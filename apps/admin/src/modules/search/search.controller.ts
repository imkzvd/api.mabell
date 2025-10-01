import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Domain, App } from '@api.mabell/core';
import { QueryBus } from '@api.mabell/cqrs';
import { SearchResultRO } from './ros/search-result.ro';
import { IndexedArtistRO } from './ros/indexed-artist.ro';
import { IndexedUserRO } from './ros/indexed-user.ro';
import { IndexedAlbumRO } from './ros/indexed-album.ro';
import { IndexedTrackRO } from './ros/indexed-track.ro';
import { IndexedPlaylistRO } from './ros/indexed-playlist.ro';
import { Roles } from '../../decorators/roles.decorator';

@ApiTags('Search')
@Roles(Domain.Admin.AdminRoles.Owner, Domain.Admin.AdminRoles.Admin, Domain.Admin.AdminRoles.Guest)
@Controller('/search')
export class SearchController {
  constructor(private readonly _QB: QueryBus) {}

  @ApiOperation({ summary: 'Global search', operationId: 'search' })
  @ApiQuery({
    required: true,
    type: String,
    name: 'q',
    description: 'QueryTypes',
    example: 'eminem',
  })
  @ApiOkResponse({ description: 'Result', type: SearchResultRO })
  @Get('/')
  async search(@Query('q') q: string): Promise<SearchResultRO> {
    const result = await this._QB.execute(
      new App.CQRS.GetItemsQuery(q, {
        collections: [
          App.Ports.SEARCH_COLLECTIONS.artists,
          App.Ports.SEARCH_COLLECTIONS.albums,
          App.Ports.SEARCH_COLLECTIONS.tracks,
          App.Ports.SEARCH_COLLECTIONS.playlists,
          App.Ports.SEARCH_COLLECTIONS.users,
        ],
      }),
    );

    return new SearchResultRO(result);
  }

  @ApiOperation({ summary: 'User search', operationId: 'userSearch' })
  @ApiQuery({
    required: true,
    type: String,
    name: 'q',
    description: 'QueryTypes',
    example: 'james007',
  })
  @ApiOkResponse({ description: 'Result', type: [IndexedUserRO] })
  @Get('/users')
  async userSearch(@Query('q') q: string): Promise<IndexedUserRO[]> {
    const result = await this._QB.execute(new App.CQRS.GetUsersQuery(q));

    return result.map((i) => new IndexedUserRO(i));
  }

  @ApiOperation({ summary: 'Artist search', operationId: 'artistSearch' })
  @ApiQuery({
    required: true,
    type: String,
    name: 'q',
    description: 'QueryTypes',
    example: 'eminem',
  })
  @ApiOkResponse({ description: 'Result', type: [IndexedArtistRO] })
  @Get('/artists')
  async artistSearch(@Query('q') q: string): Promise<IndexedArtistRO[]> {
    const result = await this._QB.execute(new App.CQRS.GetArtistsQuery(q));

    return result.map((i) => new IndexedArtistRO(i));
  }

  @ApiOperation({ summary: 'Album search', operationId: 'albumSearch' })
  @ApiQuery({
    required: true,
    type: String,
    name: 'q',
    description: 'QueryTypes',
    example: 'kamikaze',
  })
  @ApiOkResponse({ description: 'Result', type: [IndexedAlbumRO] })
  @Get('/albums')
  async albumSearch(@Query('q') q: string): Promise<IndexedAlbumRO[]> {
    const result = await this._QB.execute(new App.CQRS.GetAlbumsQuery(q));

    return result.map((i) => new IndexedAlbumRO(i));
  }

  @ApiOperation({ summary: 'Track search', operationId: 'trackSearch' })
  @ApiQuery({
    required: true,
    type: String,
    name: 'q',
    description: 'QueryTypes',
    example: 'lucky you',
  })
  @ApiOkResponse({ description: 'Result', type: [IndexedTrackRO] })
  @Get('/tracks')
  async trackSearch(@Query('q') q: string): Promise<IndexedTrackRO[]> {
    const result = await this._QB.execute(new App.CQRS.GetTracksQuery(q));

    return result.map((i) => new IndexedTrackRO(i));
  }

  @ApiOperation({ summary: 'Playlist search', operationId: 'playlistSearch' })
  @ApiQuery({
    required: true,
    type: String,
    name: 'q',
    description: 'QueryTypes',
    example: 'hip-hop 2025',
  })
  @ApiOkResponse({ description: 'Result', type: [IndexedPlaylistRO] })
  @Get('/playlists')
  async playlistSearch(@Query('q') q: string): Promise<IndexedPlaylistRO[]> {
    const result = await this._QB.execute(new App.CQRS.GetPlaylistsQuery(q));

    return result.map((i) => new IndexedPlaylistRO(i));
  }
}
