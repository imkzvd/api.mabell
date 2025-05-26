import { Event } from '../ports/event-bus.port';

export type AlbumUpdatedPayload = {
  id: string;
};

export class AlbumUpdatedEvent implements Event<AlbumUpdatedPayload> {
  public readonly name = 'album.updated';

  constructor(public readonly payload: AlbumUpdatedPayload) {}
}
