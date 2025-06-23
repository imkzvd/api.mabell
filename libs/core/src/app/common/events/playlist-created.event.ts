import { Event } from '../ports/event-bus.port';
import { PlaylistId } from '@core/domain/components/playlist/types';

export type PlaylistCreatedPayload = {
  id: PlaylistId;
};

export class PlaylistCreatedEvent implements Event<PlaylistCreatedPayload> {
  public readonly name = 'playlist.created';

  constructor(public readonly payload: PlaylistCreatedPayload) {}
}
