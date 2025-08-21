import { Event } from '../../ports/event-bus/types';
import { PlaylistEventPayload } from './types';

export class PlaylistCreatedEvent extends Event<PlaylistEventPayload> {
  public readonly name = 'playlist.created';

  constructor(public readonly payload: PlaylistEventPayload) {
    super();
  }
}
