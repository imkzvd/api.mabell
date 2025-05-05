import { HydratedDocument } from 'mongoose';
import { Overwrite } from 'utility-types';
import { Album } from './album.schema';
import { ArtistDocument } from '../artist/types';
import { Artist } from '../artist/artist.schema';

export type AlbumDocument = HydratedDocument<Album>;

export type AlbumWithArtistsDocument = Overwrite<
  AlbumDocument,
  {
    artists: ArtistDocument[];
  }
>;

export type AlbumWithArtists = Overwrite<
  Album,
  {
    artists: Artist[];
  }
>;
