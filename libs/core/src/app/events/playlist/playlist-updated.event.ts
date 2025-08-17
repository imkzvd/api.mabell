import { Event } from '../../ports/event-bus/types';
import { PlaylistEventPayload } from './types';

export class PlaylistUpdatedEvent extends Event<PlaylistEventPayload> {
  public readonly name = 'playlist.updated';

  constructor(public readonly payload: PlaylistEventPayload) {
    super();
  }
}
