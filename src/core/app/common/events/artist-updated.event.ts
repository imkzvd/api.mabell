import { Event } from '../ports/event-bus.port';

export type ArtistUpdatedPayload = {
  id: string;
};

export class ArtistUpdatedEvent implements Event<ArtistUpdatedPayload> {
  public readonly name = 'artist.updated';

  constructor(public readonly payload: ArtistUpdatedPayload) {}
}
