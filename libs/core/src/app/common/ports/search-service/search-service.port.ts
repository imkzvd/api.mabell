import { IndexedUserDTO } from './dtos/indexed-user.dto';
import { IndexedArtistDTO } from './dtos/indexed-artist.dto';
import { IndexedAlbumDTO } from './dtos/indexed-album.dto';
import { IndexedTrackDTO } from './dtos/indexed-track.dto';
import { IndexedItemsDTO } from './dtos/indexed-items.dto';
import { IndexedPlaylistDTO } from './dtos/indexed-playlist.dto';

export const SEARCH_SERVICE_DI_TOKEN = Symbol('SEARCH_SERVICE_DI_TOKEN');

export interface SearchService {
  findByKey(key: string, isPublic?: boolean): Promise<IndexedItemsDTO>;

  findUsersByKey(key: string, isPublic?: boolean): Promise<IndexedUserDTO[]>;

  findArtistsByKey(key: string, isPublic?: boolean): Promise<IndexedArtistDTO[]>;

  findAlbumsByKey(key: string, isPublic?: boolean): Promise<IndexedAlbumDTO[]>;

  findTracksByKey(key: string, isPublic?: boolean): Promise<IndexedTrackDTO[]>;

  findPlaylistsByKey(key: string, isPublic?: boolean): Promise<IndexedPlaylistDTO[]>;
}
