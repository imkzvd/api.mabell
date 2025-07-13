import { IndexedUserDTO } from './dtos/indexed-user.dto';
import { IndexedArtistDTO } from './dtos/indexed-artist.dto';
import { IndexedAlbumDTO } from './dtos/indexed-album.dto';
import { IndexedTrackDTO } from './dtos/indexed-track.dto';
import { IndexedItemsDTO } from './dtos/indexed-items.dto';
import { IndexedPlaylistDTO } from './dtos/indexed-playlist.dto';

export interface SearchService {
  find(q: string, isGlobal?: boolean): Promise<IndexedItemsDTO>;

  findUsers(q: string): Promise<IndexedUserDTO[]>;

  findArtists(q: string, isGlobal?: boolean): Promise<IndexedArtistDTO[]>;

  findAlbums(q: string, isGlobal?: boolean): Promise<IndexedAlbumDTO[]>;

  findTracks(q: string, isGlobal?: boolean): Promise<IndexedTrackDTO[]>;

  findPlaylists(q: string, isGlobal?: boolean): Promise<IndexedPlaylistDTO[]>;
}
