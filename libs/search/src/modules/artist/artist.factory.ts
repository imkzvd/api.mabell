import { ArtistPayload } from './types';
import { Artist } from './artist.document';

export class ArtistFactory {
  static create(payload: ArtistPayload) {
    return new Artist(payload.id, payload.name, payload.avatar || undefined, payload.isPublic);
  }
}
