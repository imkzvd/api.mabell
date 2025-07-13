import { PlaylistPayload } from '@infrastructure/typesense/modules/playlist/types';
import { Playlist } from '@infrastructure/typesense/modules/playlist/playlist.document';

export class PlaylistFactory {
  static create(payload: PlaylistPayload) {
    return new Playlist(
      payload.id,
      payload.name,
      payload.owner.id,
      payload.owner.name,
      payload.cover || undefined,
      payload.isPublic && payload.owner.isPublic,
    );
  }
}
