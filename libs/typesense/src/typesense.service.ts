import { Inject } from '@nestjs/common';
import {
  SearchService,
  IndexedItemsDTO,
  IndexedUserDTO,
  IndexedArtistDTO,
  IndexedAlbumDTO,
  IndexedTrackDTO,
  IndexedPlaylistDTO,
} from '@api.mabell/core';
import { UserCollection } from './modules/user/user.collection';
import { ArtistCollection } from './modules/artist/artist.collection';
import { AlbumCollection } from './modules/album/album.collection';
import { TrackCollection } from './modules/track/track.collection';
import { PlaylistCollection } from './modules/playlist/playlist.collection';

export class TypesenseService implements SearchService {
  constructor(
    @Inject(UserCollection) private readonly _userCollection: UserCollection,
    @Inject(ArtistCollection) private readonly _artistCollection: ArtistCollection,
    @Inject(AlbumCollection) private readonly _albumCollection: AlbumCollection,
    @Inject(TrackCollection) private readonly _trackCollection: TrackCollection,
    @Inject(PlaylistCollection) private readonly _playlistCollection: PlaylistCollection,
  ) {}

  async find(q: string, isGlobal?: boolean): Promise<IndexedItemsDTO> {
    const foundUsers = await this._userCollection.find(q);
    const foundArtists = await this._artistCollection.find(q, isGlobal);
    const foundAlbums = await this._albumCollection.find(q, isGlobal);
    const foundTracks = await this._trackCollection.find(q, isGlobal);
    const foundPlaylists = await this._playlistCollection.find(q, isGlobal);

    return new IndexedItemsDTO(foundUsers, foundArtists, foundAlbums, foundTracks, foundPlaylists);
  }

  findUsers(q: string): Promise<IndexedUserDTO[]> {
    return this._userCollection.find(q);
  }

  findArtists(q: string, isGlobal?: boolean): Promise<IndexedArtistDTO[]> {
    return this._artistCollection.find(q, isGlobal);
  }

  findAlbums(q: string, isGlobal?: boolean): Promise<IndexedAlbumDTO[]> {
    return this._albumCollection.find(q, isGlobal);
  }

  findTracks(q: string, isGlobal?: boolean): Promise<IndexedTrackDTO[]> {
    return this._trackCollection.find(q, isGlobal);
  }

  findPlaylists(q: string, isGlobal?: boolean): Promise<IndexedPlaylistDTO[]> {
    return this._playlistCollection.find(q, isGlobal);
  }
}
