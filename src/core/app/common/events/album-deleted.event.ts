import { Event } from '../ports/event-bus.port';

export type AlbumDeletedPayload = {
  id: string;
};

export class AlbumDeletedEvent implements Event<AlbumDeletedPayload> {
  public readonly name = 'album.deleted';

  constructor(public readonly payload: AlbumDeletedPayload) {}
}
