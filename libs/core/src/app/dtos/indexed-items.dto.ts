import { IndexedUserDTO } from './indexed-user.dto';
import { IndexedArtistDTO } from './indexed-artist.dto';
import { IndexedAlbumDTO } from './indexed-album.dto';
import { IndexedTrackDTO } from './indexed-track.dto';
import { IndexedPlaylistDTO } from './indexed-playlist.dto';
import { IndexedUsersDTO } from './indexed-users.dto';
import { IndexedArtistsDTO } from './indexed-artists.dto';
import { IndexedAlbumsDTO } from './indexed-albums.dto';
import { IndexedTracksDTO } from './indexed-tracks.dto';
import { IndexedPlaylistsDTO } from './indexed-playlists.dto';

export class IndexedItemsDTO {
  constructor(
    public readonly users: IndexedUsersDTO,
    public readonly artists: IndexedArtistsDTO,
    public readonly albums: IndexedAlbumsDTO,
    public readonly tracks: IndexedTracksDTO,
    public readonly playlists: IndexedPlaylistsDTO,
    public readonly topResults: (
      | IndexedUserDTO
      | IndexedArtistDTO
      | IndexedAlbumDTO
      | IndexedTrackDTO
      | IndexedPlaylistDTO
    )[],
  ) {}
}
