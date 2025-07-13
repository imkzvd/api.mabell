import { ArtistPayload } from '@infrastructure/typesense/modules/artist/types';
import { Artist } from '@infrastructure/typesense/modules/artist/artist.document';

export class ArtistFactory {
  static create(payload: ArtistPayload) {
    return new Artist(payload.id, payload.name, payload.avatar || undefined, payload.isPublic);
  }
}
