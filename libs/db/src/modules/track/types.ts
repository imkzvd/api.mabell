import { HydratedDocument } from 'mongoose';
import { Overwrite } from 'utility-types';
import type { Track } from './track.schema';
import { AlbumWithArtists, AlbumWithArtistsDocument } from '../album/types';
import { ArtistDocument } from '../artist/types';
import { Artist } from '../artist/artist.schema';

export type TrackDocument = HydratedDocument<Track>;

export type TrackWithAlbumAndArtistsDocument = Overwrite<
  TrackDocument,
  {
    album: AlbumWithArtistsDocument;
    artists: ArtistDocument[];
    featArtists: ArtistDocument[];
  }
>;

export type TrackWithAlbumAndArtists = Overwrite<
  Track,
  {
    album: AlbumWithArtists;
    artists: Artist[];
    featArtists: Artist[];
  }
>;
