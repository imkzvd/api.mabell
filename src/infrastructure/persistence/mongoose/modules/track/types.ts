import { Overwrite } from 'utility-types';
import type { Track } from './track.document';
import { Artist } from '../artist/artist.document';
import { Album } from '../album/album.document';
import { AlbumWithArtistsDocument } from '../album/types';

export type TrackWithAlbumAndArtistDocument = Overwrite<
  Track,
  {
    album: Overwrite<Album, AlbumWithArtistsDocument>;
    artists: Artist[];
    featArtists: Artist[];
  }
>;
