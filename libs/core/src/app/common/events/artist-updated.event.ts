import { Event } from '../ports/event-bus.port';
import { ArtistId } from '../../../domain/components/artist/types';

export type ArtistUpdatedPayload = {
  id: ArtistId;
};

export class ArtistUpdatedEvent implements Event<ArtistUpdatedPayload> {
  public readonly name = 'artist.updated';

  constructor(public readonly payload: ArtistUpdatedPayload) {}
}
