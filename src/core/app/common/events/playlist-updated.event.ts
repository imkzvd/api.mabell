import { Event } from '../ports/event-bus.port';
import { PlaylistId } from '../../../domain/components/playlist/types';

export type PlaylistUpdatedPayload = {
  id: PlaylistId;
};

export class PlaylistUpdatedEvent implements Event<PlaylistUpdatedPayload> {
  public readonly name = 'playlist.updated';

  constructor(public readonly payload: PlaylistUpdatedPayload) {}
}
