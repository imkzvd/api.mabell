import { PlaylistPayload } from './types';
import { Playlist } from './playlist.document';

export class PlaylistFactory {
  static create(payload: PlaylistPayload) {
    return new Playlist(
      payload.id,
      payload.name,
      payload.user.id,
      payload.user.name,
      payload.cover || undefined,
      payload.isPublic && payload.user.isPublic,
    );
  }
}
