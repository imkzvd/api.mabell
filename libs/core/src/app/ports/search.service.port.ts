import {
  IndexedItemsDTO,
  IndexedUsersDTO,
  IndexedArtistsDTO,
  IndexedAlbumsDTO,
  IndexedTracksDTO,
  IndexedPlaylistsDTO,
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
  ): Promise<IndexedUsersDTO>;

  findArtists(
    q: string,
    options?: Partial<{
      isGlobal?: boolean;
    }>,
  ): Promise<IndexedArtistsDTO>;

  findAlbums(
    q: string,
    options?: Partial<{
      isGlobal?: boolean;
    }>,
  ): Promise<IndexedAlbumsDTO>;

  findTracks(
    q: string,
    options?: Partial<{
      isGlobal?: boolean;
    }>,
  ): Promise<IndexedTracksDTO>;

  findPlaylists(
    q: string,
    options?: Partial<{
      isGlobal?: boolean;
    }>,
  ): Promise<IndexedPlaylistsDTO>;
}
