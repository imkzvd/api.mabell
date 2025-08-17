import { Event } from '../../ports/event-bus/types';
import { PlaylistId } from '../../../domain/components/playlist/types';

export type PlaylistsDeletedEventPayload = {
  ids: PlaylistId[];
};

export class PlaylistsDeletedEvent extends Event<PlaylistsDeletedEventPayload> {
  public readonly name = 'playlists.deleted';

  constructor(public readonly payload: PlaylistsDeletedEventPayload) {
    super();
  }
}
