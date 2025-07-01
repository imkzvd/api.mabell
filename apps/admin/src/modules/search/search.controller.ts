import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AdminRoles } from '@core/domain/components/admin/constants/admin-roles';
import { QueryBus } from '@infrastructure/query-bus';
import { GetItemsQuery } from '@core/app/cqrs/search/queries/get-items/get-items.query';
import { GetUsersQuery } from '@core/app/cqrs/search/queries/get-users/get-users.query';
import { GetArtistsQuery } from '@core/app/cqrs/search/queries/get-artists/get-artists.query';
import { GetAlbumsQuery } from '@core/app/cqrs/search/queries/get-albums/get-albums.query';
import { GetTracksQuery } from '@core/app/cqrs/search/queries/get-tracks/get-tracks.query';
import { GetPlaylistsQuery } from '@core/app/cqrs/search/queries/get-playlists/get-playlists.query';
import { SearchResultRO } from './ros/search-result.ro';
import { IndexedArtistRO } from './ros/indexed-artist.ro';
import { IndexedUserRO } from './ros/indexed-user.ro';
import { IndexedAlbumRO } from './ros/indexed-album.ro';
import { IndexedTrackRO } from './ros/indexed-track.ro';
import { IndexedPlaylistRO } from './ros/indexed-playlist.ro';
import { Roles } from '../../decorators/roles.decorator';

@ApiTags('Search')
@Roles(AdminRoles.Owner, AdminRoles.Admin, AdminRoles.Guest)
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
    const result = await this._QB.execute(new GetItemsQuery(q));

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
    const result = await this._QB.execute(new GetUsersQuery(q));

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
    const result = await this._QB.execute(new GetArtistsQuery(q));

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
    const result = await this._QB.execute(new GetAlbumsQuery(q));

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
    const result = await this._QB.execute(new GetTracksQuery(q));

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
    const result = await this._QB.execute(new GetPlaylistsQuery(q));

    return result.map((i) => new IndexedPlaylistRO(i));
  }
}
