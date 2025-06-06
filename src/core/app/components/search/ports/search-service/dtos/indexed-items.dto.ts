import { IndexedUserDTO } from './indexed-user.dto';
import { IndexedArtistDTO } from './indexed-artist.dto';
import { IndexedAlbumDTO } from './indexed-album.dto';
import { IndexedTrackDTO } from './indexed-track.dto';
import { IndexedPlaylistDTO } from './indexed-playlist.dto';

export class IndexedItemsDTO {
  constructor(
    public readonly users: IndexedUserDTO[],
    public readonly artists: IndexedArtistDTO[],
    public readonly albums: IndexedAlbumDTO[],
    public readonly tracks: IndexedTrackDTO[],
    public readonly playlists: IndexedPlaylistDTO[],
  ) {}
}
