import { Event } from '../ports/event-bus.port';
import { PlaylistId } from '../../../domain/components/playlist/types';

export type PlaylistsDeletedPayload = {
  ids: PlaylistId[];
};

export class PlaylistsDeletedEvent implements Event<PlaylistsDeletedPayload> {
  public readonly name = 'playlists.deleted';

  constructor(public readonly payload: PlaylistsDeletedPayload) {}
}
