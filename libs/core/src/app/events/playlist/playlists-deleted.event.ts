import { Event } from '../../ports';
import { PlaylistId } from '../../../../domain/components/playlist';

export type PlaylistsDeletedEventPayload = {
  ids: PlaylistId[];
};

export class PlaylistsDeletedEvent extends Event<PlaylistsDeletedEventPayload> {
  public readonly name = 'playlists.deleted';

  constructor(public readonly payload: PlaylistsDeletedEventPayload) {
    super();
  }
}
