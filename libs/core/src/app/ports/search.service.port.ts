import {
  IndexedItemsDTO,
  IndexedUserDTO,
  IndexedArtistDTO,
  IndexedAlbumDTO,
  IndexedTrackDTO,
  IndexedPlaylistDTO,
} from '../dtos';

export enum SEARCH_COLLECTIONS {
  'users' = 'users',
  'artists' = 'artists',
  'albums' = 'albums',
  'tracks' = 'tracks',
  'playlists' = 'playlists',
}

export interface SearchService {
  find(
    q: string,
    options?: Partial<{
      collections: SEARCH_COLLECTIONS[];
      isGlobal: boolean;
    }>,
  ): Promise<IndexedItemsDTO>;

  findUsers(
    q: string,
    options?: Partial<{
      isGlobal?: boolean;
    }>,
  ): Promise<IndexedUserDTO[]>;

  findArtists(
    q: string,
    options?: Partial<{
      isGlobal?: boolean;
    }>,
  ): Promise<IndexedArtistDTO[]>;

  findAlbums(
    q: string,
    options?: Partial<{
      isGlobal?: boolean;
    }>,
  ): Promise<IndexedAlbumDTO[]>;

  findTracks(
    q: string,
    options?: Partial<{
      isGlobal?: boolean;
    }>,
  ): Promise<IndexedTrackDTO[]>;

  findPlaylists(
    q: string,
    options?: Partial<{
      isGlobal?: boolean;
    }>,
  ): Promise<IndexedPlaylistDTO[]>;
}
