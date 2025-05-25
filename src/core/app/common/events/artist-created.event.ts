import { Event } from '../ports/event-bus.port';

export type ArtistCreatedPayload = {
  id: string;
};

export class ArtistCreatedEvent implements Event<ArtistCreatedPayload> {
  public readonly name = 'artist.created';

  constructor(public readonly payload: ArtistCreatedPayload) {}
}
