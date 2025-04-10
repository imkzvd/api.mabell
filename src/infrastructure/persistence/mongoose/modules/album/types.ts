import { Overwrite } from 'utility-types';
import { Album } from './album.document';
import { Artist } from '../artist/artist.document';

export type AlbumPopulatedDocument = Overwrite<
  Album,
  {
    artists: Artist[];
  }
>;
