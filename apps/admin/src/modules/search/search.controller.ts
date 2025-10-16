import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Domain, App } from '@api.mabell/core';
import { QueryBus } from '@api.mabell/cqrs';
import { SearchResultRO } from './ros/search-result.ro';
import { Roles } from '../../decorators/roles.decorator';
import { IndexedUsersRO } from './ros/indexed-users.ro';
import { IndexedArtistsRO } from './ros/indexed-artists.ro';
import { IndexedAlbumsRO } from './ros/indexed-albums.ro';
import { IndexedTracksRO } from './ros/indexed-tracks.ro';
import { IndexedPlaylistsRO } from './ros/indexed-playlists.ro';

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
  @ApiOkResponse({ description: 'Result', type: () => IndexedUsersRO })
  @Get('/users')
  async userSearch(@Query('q') q: string): Promise<IndexedUsersRO> {
    const result = await this._QB.execute(new App.CQRS.GetUsersQuery(q));

    return new IndexedUsersRO(result);
  }

  @ApiOperation({ summary: 'Artist search', operationId: 'artistSearch' })
  @ApiQuery({
    required: true,
    type: String,
    name: 'q',
    description: 'QueryTypes',
    example: 'eminem',
  })
  @ApiOkResponse({ description: 'Result', type: () => IndexedArtistsRO })
  @Get('/artists')
  async artistSearch(@Query('q') q: string): Promise<IndexedArtistsRO> {
    const result = await this._QB.execute(new App.CQRS.GetArtistsQuery(q));

    return new IndexedArtistsRO(result);
  }

  @ApiOperation({ summary: 'Album search', operationId: 'albumSearch' })
  @ApiQuery({
    required: true,
    type: String,
    name: 'q',
    description: 'QueryTypes',
    example: 'kamikaze',
  })
  @ApiOkResponse({ description: 'Result', type: () => IndexedAlbumsRO })
  @Get('/albums')
  async albumSearch(@Query('q') q: string): Promise<IndexedAlbumsRO> {
    const result = await this._QB.execute(new App.CQRS.GetAlbumsQuery(q));

    return new IndexedAlbumsRO(result);
  }

  @ApiOperation({ summary: 'Track search', operationId: 'trackSearch' })
  @ApiQuery({
    required: true,
    type: String,
    name: 'q',
    description: 'QueryTypes',
    example: 'lucky you',
  })
  @ApiOkResponse({ description: 'Result', type: () => IndexedTracksRO })
  @Get('/tracks')
  async trackSearch(@Query('q') q: string): Promise<IndexedTracksRO> {
    const result = await this._QB.execute(new App.CQRS.GetTracksQuery(q));

    return new IndexedTracksRO(result);
  }

  @ApiOperation({ summary: 'Playlist search', operationId: 'playlistSearch' })
  @ApiQuery({
    required: true,
    type: String,
    name: 'q',
    description: 'QueryTypes',
    example: 'hip-hop 2025',
  })
  @ApiOkResponse({ description: 'Result', type: () => IndexedPlaylistsRO })
  @Get('/playlists')
  async playlistSearch(@Query('q') q: string): Promise<IndexedPlaylistsRO> {
    const result = await this._QB.execute(new App.CQRS.GetPlaylistsQuery(q));

    return new IndexedPlaylistsRO(result);
  }
}
