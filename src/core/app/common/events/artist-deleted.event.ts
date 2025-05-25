import { Event } from '../ports/event-bus.port';

export type ArtistDeletedPayload = {
  id: string;
};

export class ArtistDeletedEvent implements Event<ArtistDeletedPayload> {
  public readonly name = 'artist.deleted';

  constructor(public readonly payload: ArtistDeletedPayload) {}
}
