import { ApiProperty } from '@nestjs/swagger';
import { App } from '@api.mabell/core';
import { IndexedArtistRO } from './indexed-artist.ro';
import { IndexedAlbumRO } from './indexed-album.ro';
import { IndexedTrackRO } from './indexed-track.ro';
import { IndexedPlaylistRO } from './indexed-playlist.ro';

export class SearchResultRO {
  @ApiProperty({ description: 'Artists', type: () => [IndexedArtistRO] })
  artists: IndexedArtistRO[];

  @ApiProperty({ description: 'Albums', type: () => [IndexedAlbumRO] })
  albums: IndexedAlbumRO[];

  @ApiProperty({ description: 'Tracks', type: () => [IndexedTrackRO] })
  tracks: IndexedTrackRO[];

  @ApiProperty({ description: 'Playlists', type: () => [IndexedPlaylistRO] })
  playlists: IndexedPlaylistRO[];

  constructor(
    props: Partial<{
      artists: App.DTOs.IndexedArtistDTO[];
      albums: App.DTOs.IndexedAlbumDTO[];
      tracks: App.DTOs.IndexedTrackDTO[];
      users: App.DTOs.IndexedUserDTO[];
      playlists: App.DTOs.IndexedPlaylistDTO[];
    }>,
  ) {
    this.artists = props.artists?.map((dto) => new IndexedArtistRO(dto)) || [];
    this.albums = props.albums?.map((dto) => new IndexedAlbumRO(dto)) || [];
    this.tracks = props.tracks?.map((dto) => new IndexedTrackRO(dto)) || [];
    this.playlists = props.playlists?.map((dto) => new IndexedPlaylistRO(dto)) || [];
  }
}
