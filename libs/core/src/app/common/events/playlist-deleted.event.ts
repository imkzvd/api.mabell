import { Event } from '@core/app/common/ports/event-bus.port';
import { PlaylistId } from '@core/domain/components/playlist/types';

export type PlaylistDeletedEventPayload = {
  id: PlaylistId;
};

export class PlaylistDeletedEvent extends Event<PlaylistDeletedEventPayload> {
  public readonly name = 'playlist.deleted';

  constructor(public readonly payload: PlaylistDeletedEventPayload) {
    super();
  }
}
