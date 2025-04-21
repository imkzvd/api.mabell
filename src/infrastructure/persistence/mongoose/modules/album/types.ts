import { Overwrite } from 'utility-types';
import { Album } from './album.document';
import { Artist } from '../artist/artist.document';

export type AlbumWithArtistsDocument = Overwrite<
  Album,
  {
    artists: Artist[];
  }
>;
