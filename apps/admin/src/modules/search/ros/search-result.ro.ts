import { ApiProperty } from '@nestjs/swagger';
import { IndexedArtistRO } from './indexed-artist.ro';
import { IndexedAlbumRO } from './indexed-album.ro';
import { IndexedTrackRO } from './indexed-track.ro';
import { IndexedUserRO } from './indexed-user.ro';
import { IndexedPlaylistRO } from './indexed-playlist.ro';
import { IndexedArtistDTO } from '../../../../../../core/app/components/search/ports/search-service/dtos/indexed-artist.dto';
import { IndexedAlbumDTO } from '../../../../../../core/app/components/search/ports/search-service/dtos/indexed-album.dto';
import { IndexedTrackDTO } from '../../../../../../core/app/components/search/ports/search-service/dtos/indexed-track.dto';
import { IndexedUserDTO } from '../../../../../../core/app/components/search/ports/search-service/dtos/indexed-user.dto';
import { IndexedPlaylistDTO } from '../../../../../../core/app/components/search/ports/search-service/dtos/indexed-playlist.dto';

export class SearchResultRO {
  @ApiProperty({ description: 'Artists', type: () => [IndexedArtistRO] })
  artists: IndexedArtistRO[];

  @ApiProperty({ description: 'Albums', type: () => [IndexedAlbumRO] })
  albums: IndexedAlbumRO[];

  @ApiProperty({ description: 'Tracks', type: () => [IndexedTrackRO] })
  tracks: IndexedTrackRO[];

  @ApiProperty({ description: 'Users', type: () => [IndexedUserRO] })
  users: IndexedUserRO[];

  @ApiProperty({ description: 'Playlists', type: () => [IndexedPlaylistRO] })
  playlists: IndexedPlaylistRO[];

  constructor(
    props: Partial<{
      artists: IndexedArtistDTO[];
      albums: IndexedAlbumDTO[];
      tracks: IndexedTrackDTO[];
      users: IndexedUserDTO[];
      playlists: IndexedPlaylistDTO[];
    }>,
  ) {
    this.artists = props.artists?.map((dto) => new IndexedArtistRO(dto)) || [];
    this.albums = props.albums?.map((dto) => new IndexedAlbumRO(dto)) || [];
    this.tracks = props.tracks?.map((dto) => new IndexedTrackRO(dto)) || [];
    this.users = props.users?.map((dto) => new IndexedUserRO(dto)) || [];
    this.playlists = props.playlists?.map((dto) => new IndexedPlaylistRO(dto)) || [];
  }
}
