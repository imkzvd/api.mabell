import { Event } from '@core/app/common/ports/event-bus.port';
import { PlaylistId } from '@core/domain/components/playlist/types';

export type PlaylistsDeletedEventPayload = {
  ids: PlaylistId[];
};

export class PlaylistsDeletedEvent extends Event<PlaylistsDeletedEventPayload> {
  public readonly name = 'playlists.deleted';

  constructor(public readonly payload: PlaylistsDeletedEventPayload) {
    super();
  }
}
