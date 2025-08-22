import { Inject } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { UserCollection } from './modules/user/user.collection';
import { ArtistCollection } from './modules/artist/artist.collection';
import { AlbumCollection } from './modules/album/album.collection';
import { TrackCollection } from './modules/track/track.collection';
import { PlaylistCollection } from './modules/playlist/playlist.collection';

export class SearchService implements App.Ports.SearchService {
  constructor(
    @Inject(UserCollection) private readonly _userCollection: UserCollection,
    @Inject(ArtistCollection) private readonly _artistCollection: ArtistCollection,
    @Inject(AlbumCollection) private readonly _albumCollection: AlbumCollection,
    @Inject(TrackCollection) private readonly _trackCollection: TrackCollection,
    @Inject(PlaylistCollection) private readonly _playlistCollection: PlaylistCollection,
  ) {}

  async find(
    q: string,
    options?: Partial<{
      isGlobal?: boolean;
    }>,
  ): Promise<App.DTOs.IndexedItemsDTO> {
    const foundUsers = await this._userCollection.find(q, options?.isGlobal);
    const foundArtists = await this._artistCollection.find(q, options?.isGlobal);
    const foundAlbums = await this._albumCollection.find(q, options?.isGlobal);
    const foundTracks = await this._trackCollection.find(q, options?.isGlobal);
    const foundPlaylists = await this._playlistCollection.find(q, options?.isGlobal);

    return new App.DTOs.IndexedItemsDTO(
      foundUsers,
      foundArtists,
      foundAlbums,
      foundTracks,
      foundPlaylists,
    );
  }

  findUsers(
    q: string,
    options?: Partial<{
      isGlobal?: boolean;
    }>,
  ): Promise<App.DTOs.IndexedUserDTO[]> {
    return this._userCollection.find(q, options?.isGlobal);
  }

  findArtists(
    q: string,
    options?: Partial<{
      isGlobal?: boolean;
    }>,
  ): Promise<App.DTOs.IndexedArtistDTO[]> {
    return this._artistCollection.find(q, options?.isGlobal);
  }

  findAlbums(
    q: string,
    options?: Partial<{
      isGlobal?: boolean;
    }>,
  ): Promise<App.DTOs.IndexedAlbumDTO[]> {
    return this._albumCollection.find(q, options?.isGlobal);
  }

  findTracks(
    q: string,
    options?: Partial<{
      isGlobal?: boolean;
    }>,
  ): Promise<App.DTOs.IndexedTrackDTO[]> {
    return this._trackCollection.find(q, options?.isGlobal);
  }

  findPlaylists(
    q: string,
    options?: Partial<{
      isGlobal?: boolean;
    }>,
  ): Promise<App.DTOs.IndexedPlaylistDTO[]> {
    return this._playlistCollection.find(q, options?.isGlobal);
  }
}
