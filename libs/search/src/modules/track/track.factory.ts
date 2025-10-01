import { Track } from './track.document';
import { TrackPayload } from './types';

export class TrackFactory {
  static create(payload: TrackPayload) {
    return new Track(
      payload.id,
      payload.name,
      payload.album.id,
      payload.album.name,
      payload.album.isPublic,
      payload.artists.map(({ id }) => id),
      payload.artists.map(({ name }) => name),
      payload.artists.map(({ isPublic }) => isPublic),
      payload.featArtists.map(({ id }) => id),
      payload.featArtists.map(({ name }) => name),
      payload.featArtists.map(({ isPublic }) => isPublic),
      payload.isExplicit,
      payload.cover || undefined,
      payload.isPublic,
      payload.isPublic &&
        payload.album.isPublic &&
        payload.artists.every(({ isPublic }) => isPublic),
    );
  }
}
