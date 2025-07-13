import { Inject } from '@nestjs/common';
import { SearchService } from '@core/app/common/ports/search-service/search-service.port';
import { IndexedItemsDTO } from '@core/app/common/ports/search-service/dtos/indexed-items.dto';
import { IndexedUserDTO } from '@core/app/common/ports/search-service/dtos/indexed-user.dto';
import { IndexedArtistDTO } from '@core/app/common/ports/search-service/dtos/indexed-artist.dto';
import { IndexedAlbumDTO } from '@core/app/common/ports/search-service/dtos/indexed-album.dto';
import { IndexedTrackDTO } from '@core/app/common/ports/search-service/dtos/indexed-track.dto';
import { IndexedPlaylistDTO } from '@core/app/common/ports/search-service/dtos/indexed-playlist.dto';
import { UserCollection } from '@infrastructure/typesense/modules/user/user.collection';
import { ArtistCollection } from '@infrastructure/typesense/modules/artist/artist.collection';
import { AlbumCollection } from '@infrastructure/typesense/modules/album/album.collection';
import { TrackCollection } from '@infrastructure/typesense/modules/track/track.collection';

export class TypesenseService implements SearchService {
  constructor(
    @Inject(UserCollection) private readonly _userCollection: UserCollection,
    @Inject(ArtistCollection) private readonly _artistCollection: ArtistCollection,
    @Inject(AlbumCollection) private readonly _albumCollection: AlbumCollection,
    @Inject(TrackCollection) private readonly _trackCollection: TrackCollection,
  ) {}

  async find(q: string, isGlobal?: boolean): Promise<IndexedItemsDTO> {
    const foundUsers = await this._userCollection.find(q);
    const foundArtists = await this._artistCollection.find(q, isGlobal);
    const foundAlbums = await this._albumCollection.find(q, isGlobal);
    const foundTracks = await this._trackCollection.find(q, isGlobal);

    return new IndexedItemsDTO(foundUsers, foundArtists, foundAlbums, foundTracks, []);
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findPlaylists(q: string, isGlobal?: boolean): Promise<IndexedPlaylistDTO[]> {
    throw new Error('Method not implemented.');
  }
}
