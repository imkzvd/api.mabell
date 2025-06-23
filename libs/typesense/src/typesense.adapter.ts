import { ArtistCollection } from './modules/artist/artist.collection';
import { AlbumCollection } from './modules/album/album.collection';
import { TrackCollection } from './modules/track/track.collection';
import { UserCollection } from './modules/user/user.collection';
import { SearchService } from '../../../src/core/app/components/search/ports/search-service/search-service.port';
import { IndexedItemsDTO } from '../../../src/core/app/components/search/ports/search-service/dtos/indexed-items.dto';
import { IndexedUserDTO } from '../../../src/core/app/components/search/ports/search-service/dtos/indexed-user.dto';
import { IndexedArtistDTO } from '../../../src/core/app/components/search/ports/search-service/dtos/indexed-artist.dto';
import { IndexedAlbumDTO } from '../../../src/core/app/components/search/ports/search-service/dtos/indexed-album.dto';
import { IndexedTrackDTO } from '../../../src/core/app/components/search/ports/search-service/dtos/indexed-track.dto';
import { IndexedPlaylistDTO } from '../../../src/core/app/components/search/ports/search-service/dtos/indexed-playlist.dto';

export class TypesenseAdapter implements SearchService {
  constructor(
    private readonly _userCollection: UserCollection,
    private readonly _artistCollection: ArtistCollection,
    private readonly _albumCollection: AlbumCollection,
    private readonly _trackCollection: TrackCollection,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findByKey(key: string, isPublic?: boolean): Promise<IndexedItemsDTO> {
    const foundUsers = await this._userCollection.searchByQuery(key);
    const foundArtists = await this._artistCollection.searchByQuery(key);
    const foundAlbums = await this._albumCollection.searchByQuery(key);
    const foundTracks = await this._trackCollection.searchByQuery(key);

    return new IndexedItemsDTO(foundUsers, foundArtists, foundAlbums, foundTracks, []);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findUsersByKey(key: string, isPublic?: boolean): Promise<IndexedUserDTO[]> {
    return this._userCollection.searchByQuery(key);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findArtistsByKey(key: string, isPublic?: boolean): Promise<IndexedArtistDTO[]> {
    return this._artistCollection.searchByQuery(key);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAlbumsByKey(key: string, isPublic?: boolean): Promise<IndexedAlbumDTO[]> {
    return this._albumCollection.searchByQuery(key);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findTracksByKey(key: string, isPublic?: boolean): Promise<IndexedTrackDTO[]> {
    return this._trackCollection.searchByQuery(key);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findPlaylistsByKey(key: string, isPublic?: boolean): Promise<IndexedPlaylistDTO[]> {
    throw new Error('Method not implemented.');
  }
}
