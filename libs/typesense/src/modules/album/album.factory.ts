import { Album } from '@infrastructure/typesense/modules/album/album.document';
import { AlbumPayload } from '@infrastructure/typesense/modules/album/types';

export class AlbumFactory {
  static create(payload: AlbumPayload) {
    return new Album(
      payload.id,
      payload.name,
      payload.artists.map(({ id }) => id),
      payload.artists.map(({ name }) => name),
      payload.cover || undefined,
      payload.isPublic && payload.artists.every(({ isPublic }) => isPublic),
    );
  }
}
