import { Overwrite } from 'utility-types';
import type { Track } from './track.document';
import { AlbumPopulatedDocument } from '../album/types';
import { Artist } from '../artist/artist.document';

export type TrackPopulatedDocument = Overwrite<
  Track,
  {
    album: AlbumPopulatedDocument;
    artists: Artist[];
    featArtists: Artist[];
  }
>;
