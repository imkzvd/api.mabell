import { Album } from './album.document';
import { AlbumPayload } from './types';

export class AlbumFactory {
  static create(payload: AlbumPayload) {
    return new Album(
      payload.id,
      payload.name,
      payload.artists.map(({ id }) => id),
      payload.artists.map(({ name }) => name),
      payload.artists.map(({ isPublic }) => isPublic),
      payload.cover || undefined,
      payload.isPublic,
      payload.isPublic && payload.artists.every(({ isPublic }) => isPublic),
    );
  }
}
