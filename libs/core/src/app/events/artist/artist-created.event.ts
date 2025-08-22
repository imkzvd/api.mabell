import { Event } from '../../ports/event-bus/types';
import { ArtistEventPayload } from './types';

export class ArtistCreatedEvent extends Event<ArtistEventPayload> {
  public readonly name = 'artist.created';

  constructor(public readonly payload: ArtistEventPayload) {
    super();
  }
}
