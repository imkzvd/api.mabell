import { Track } from '@infrastructure/typesense/modules/track/track.document';
import { TrackPayload } from '@infrastructure/typesense/modules/track/types';

export class TrackFactory {
  static create(payload: TrackPayload) {
    return new Track(
      payload.id,
      payload.name,
      payload.album.id,
      payload.album.name,
      payload.artists.map(({ id }) => id),
      payload.artists.map(({ name }) => name),
      payload.featArtists.map(({ id }) => id),
      payload.featArtists.map(({ name }) => name),
      payload.isExplicit,
      payload.cover || undefined,
      payload.isPublic &&
        payload.album.isPublic &&
        payload.artists.every(({ isPublic }) => isPublic),
    );
  }
}
