import { Event } from '../ports/event-bus.port';
import { ArtistId } from '../../../domain/components/artist/types';

export type ArtistDeletedPayload = {
  id: ArtistId;
};

export class ArtistDeletedEvent implements Event<ArtistDeletedPayload> {
  public readonly name = 'artist.deleted';

  constructor(public readonly payload: ArtistDeletedPayload) {}
}
