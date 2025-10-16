import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { ArtistService } from './modules/artist/artist.service';
import { AlbumService } from './modules/album/album.service';
import { UserService } from './modules/user/user.service';
import { TrackService } from './modules/track/track.service';
import { PlaylistService } from './modules/playlist/playlist.service';
import { ItemWithScore } from './types';

export class SearchService implements App.Ports.SearchService {
  constructor(
    @Inject(UserService) private readonly _userService: UserService,
    @Inject(ArtistService) private readonly _artistService: ArtistService,
    @Inject(AlbumService) private readonly _albumService: AlbumService,
    @Inject(TrackService) private readonly _trackService: TrackService,
    @Inject(PlaylistService) private readonly _playlistService: PlaylistService,
  ) {}

  async find(
    q: string,
    options?: Partial<{
      collections: App.Ports.SEARCH_COLLECTIONS[];
      isGlobal: boolean;
    }>,
  ): Promise<App.DTOs.IndexedItemsDTO> {
    let foundUsers = new App.DTOs.IndexedUsersDTO();
    let foundArtists = new App.DTOs.IndexedArtistsDTO();
    let foundAlbums = new App.DTOs.IndexedAlbumsDTO();
    let foundTracks = new App.DTOs.IndexedTracksDTO();
    let foundPlaylists = new App.DTOs.IndexedPlaylistsDTO();
    let foundItems: ItemWithScore<
      | App.DTOs.IndexedUserDTO
      | App.DTOs.IndexedArtistDTO
      | App.DTOs.IndexedAlbumDTO
      | App.DTOs.IndexedTrackDTO
      | App.DTOs.IndexedPlaylistDTO
    >[] = [];

    if (options?.collections?.includes(App.Ports.SEARCH_COLLECTIONS.users)) {
      const result = await this._userService.getByQuery(q, options);

      foundUsers = {
        ...result,
        items: result.items.map(({ item }) => item),
      };
      foundItems = foundItems.concat(result.items);
    }

    if (options?.collections?.includes(App.Ports.SEARCH_COLLECTIONS.artists)) {
      const result = await this._artistService.getByQuery(q, options);

      foundArtists = {
        ...result,
        items: result.items.map(({ item }) => item),
      };
      foundItems = foundItems.concat(result.items);
    }

    if (options?.collections?.includes(App.Ports.SEARCH_COLLECTIONS.albums)) {
      const result = await this._albumService.getByQuery(q, options);

      foundAlbums = {
        ...result,
        items: result.items.map(({ item }) => item),
      };
      foundItems = foundItems.concat(result.items);
    }

    if (options?.collections?.includes(App.Ports.SEARCH_COLLECTIONS.tracks)) {
      const result = await this._trackService.getByQuery(q, options);

      foundTracks = {
        ...result,
        items: result.items.map(({ item }) => item),
      };
      foundItems = foundItems.concat(result.items);
    }

    if (options?.collections?.includes(App.Ports.SEARCH_COLLECTIONS.playlists)) {
      const result = await this._playlistService.getByQuery(q, options);

      foundPlaylists = {
        ...result,
        items: result.items.map(({ item }) => item),
      };
      foundItems = foundItems.concat(result.items);
    }

    const sortedFoundItems = foundItems.sort((a, b) => b.score - a.score).map(({ item }) => item);
    const [firstTopItem] = sortedFoundItems;

    if (firstTopItem instanceof App.DTOs.IndexedAlbumDTO) {
      const { artistIds } = firstTopItem;

      const foundAlbumArtists = await this._artistService.getByIds(artistIds, options);

      if (foundAlbumArtists.length) {
        sortedFoundItems.splice(1, 0, ...foundAlbumArtists);
        foundArtists.items.splice(0, 0, ...foundAlbumArtists);
      }
    }

    if (firstTopItem instanceof App.DTOs.IndexedTrackDTO) {
      const { albumId, artistIds, featArtistIds } = firstTopItem;

      const foundAlbum = await this._albumService.getById(albumId, options);

      if (foundAlbum) {
        sortedFoundItems.splice(1, 0, foundAlbum);
        foundAlbums.items.splice(0, 0, foundAlbum);
      }

      const allTrackArtistIds = artistIds.concat(featArtistIds);
      const foundTrackArtists = await this._artistService.getByIds(allTrackArtistIds, options);

      if (foundTrackArtists.length) {
        sortedFoundItems.splice(foundAlbum ? 2 : 1, 0, ...foundTrackArtists);
        foundArtists.items.splice(0, 0, ...foundTrackArtists);
      }
    }

    return new App.DTOs.IndexedItemsDTO(
      foundUsers,
      foundArtists,
      foundAlbums,
      foundTracks,
      foundPlaylists,
      sortedFoundItems.slice(0, 8),
    );
  }

  async findUsers(
    q: string,
    options?: Partial<{
      isGlobal: boolean;
    }>,
  ): Promise<App.DTOs.IndexedUsersDTO> {
    const result = await this._userService.getByQuery(q, options);

    return new App.DTOs.IndexedUsersDTO(
      result.items.map(({ item }) => item),
      result.total,
      result.offset,
      result.limit,
    );
  }

  async findArtists(
    q: string,
    options?: Partial<{
      isGlobal: boolean;
    }>,
  ): Promise<App.DTOs.IndexedArtistsDTO> {
    const result = await this._artistService.getByQuery(q, options);

    return new App.DTOs.IndexedArtistsDTO(
      result.items.map(({ item }) => item),
      result.total,
      result.offset,
      result.limit,
    );
  }

  async findAlbums(
    q: string,
    options?: Partial<{
      isGlobal: boolean;
    }>,
  ): Promise<App.DTOs.IndexedAlbumsDTO> {
    const result = await this._albumService.getByQuery(q, options);

    return new App.DTOs.IndexedAlbumsDTO(
      result.items.map(({ item }) => item),
      result.total,
      result.offset,
      result.limit,
    );
  }

  async findTracks(
    q: string,
    options?: Partial<{
      isGlobal?: boolean;
    }>,
  ): Promise<App.DTOs.IndexedTracksDTO> {
    const result = await this._trackService.getByQuery(q, options);

    return new App.DTOs.IndexedTracksDTO(
      result.items.map(({ item }) => item),
      result.total,
      result.offset,
      result.limit,
    );
  }

  async findPlaylists(
    q: string,
    options?: Partial<{
      isGlobal?: boolean;
    }>,
  ): Promise<App.DTOs.IndexedPlaylistsDTO> {
    const result = await this._playlistService.getByQuery(q, options);

    return new App.DTOs.IndexedPlaylistsDTO(
      result.items.map(({ item }) => item),
      result.total,
      result.offset,
      result.limit,
    );
  }
}
