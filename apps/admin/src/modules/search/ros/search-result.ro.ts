import { ApiProperty } from '@nestjs/swagger';
import { App } from '@api.mabell/core';
import { IndexedArtistRO } from './indexed-artist.ro';
import { IndexedAlbumRO } from './indexed-album.ro';
import { IndexedTrackRO } from './indexed-track.ro';
import { IndexedPlaylistRO } from './indexed-playlist.ro';
import { IndexedArtistsRO } from './indexed-artists.ro';
import { IndexedAlbumsRO } from './indexed-albums.ro';
import { IndexedTracksRO } from './indexed-tracks.ro';
import { IndexedPlaylistsRO } from './indexed-playlists.ro';
import { IndexedUsersRO } from './indexed-users.ro';
import { IndexedUserRO } from './indexed-user.ro';

export class SearchResultRO {
  @ApiProperty({ description: 'Artists', type: () => IndexedArtistsRO })
  artists: IndexedArtistsRO;

  @ApiProperty({ description: 'Albums', type: () => IndexedAlbumsRO })
  albums: IndexedAlbumsRO;

  @ApiProperty({ description: 'Tracks', type: () => IndexedTracksRO })
  tracks: IndexedTracksRO;

  @ApiProperty({ description: 'Playlists', type: () => IndexedPlaylistsRO })
  playlists: IndexedPlaylistsRO;

  @ApiProperty({ description: 'Users', type: () => IndexedUsersRO })
  users: IndexedUsersRO;

  @ApiProperty({ description: 'Top results', type: () => [IndexedPlaylistRO] })
  topResults: (
    | IndexedArtistRO
    | IndexedAlbumRO
    | IndexedTrackRO
    | IndexedPlaylistRO
    | IndexedUserRO
  )[];

  constructor(dto: App.DTOs.IndexedItemsDTO) {
    this.artists = new IndexedArtistsRO(dto.artists);
    this.albums = new IndexedAlbumsRO(dto.albums);
    this.tracks = new IndexedTracksRO(dto.tracks);
    this.playlists = new IndexedPlaylistsRO(dto.playlists);
    this.users = new IndexedUsersRO(dto.users);
    this.topResults = dto.topResults.reduce(
      (
        acc: (
          | IndexedArtistRO
          | IndexedAlbumRO
          | IndexedTrackRO
          | IndexedPlaylistRO
          | IndexedUserRO
        )[],
        dto,
      ) => {
        if (dto instanceof App.DTOs.IndexedArtistDTO) {
          acc.push(new IndexedArtistRO(dto));
        }

        if (dto instanceof App.DTOs.IndexedAlbumDTO) {
          acc.push(new IndexedAlbumRO(dto));
        }

        if (dto instanceof App.DTOs.IndexedTrackDTO) {
          acc.push(new IndexedTrackRO(dto));
        }

        if (dto instanceof App.DTOs.IndexedPlaylistDTO) {
          acc.push(new IndexedPlaylistRO(dto));
        }

        if (dto instanceof App.DTOs.IndexedUserDTO) {
          acc.push(new IndexedUserRO(dto));
        }

        return acc;
      },
      [],
    );
  }
}
