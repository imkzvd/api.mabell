import { Event } from '../../ports/event-bus/types';
import { ArtistEventPayload } from './types';

export class ArtistUpdatedEvent extends Event<ArtistEventPayload> {
  public readonly name = 'artist.updated';

  constructor(public readonly payload: ArtistEventPayload) {
    super();
  }
}
