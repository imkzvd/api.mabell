import { Event } from '../ports/event-bus.port';
import { ArtistId } from '@core/domain/components/artist/types';

export type ArtistCreatedPayload = {
  id: ArtistId;
};

export class ArtistCreatedEvent implements Event<ArtistCreatedPayload> {
  public readonly name = 'artist.created';

  constructor(public readonly payload: ArtistCreatedPayload) {}
}
