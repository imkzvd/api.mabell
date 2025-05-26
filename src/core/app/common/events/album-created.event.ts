import { Event } from '../ports/event-bus.port';

export type AlbumCreatedPayload = {
  id: string;
};

export class AlbumCreatedEvent implements Event<AlbumCreatedPayload> {
  public readonly name = 'album.created';

  constructor(public readonly payload: AlbumCreatedPayload) {}
}
