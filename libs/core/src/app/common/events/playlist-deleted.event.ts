import { Event } from '../ports/event-bus.port';
import { PlaylistId } from '@core/domain/components/playlist/types';

export type PlaylistDeletedPayload = {
  id: PlaylistId;
};

export class PlaylistDeletedEvent implements Event<PlaylistDeletedPayload> {
  public readonly name = 'playlist.deleted';

  constructor(public readonly payload: PlaylistDeletedPayload) {}
}
