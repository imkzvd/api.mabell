import { Event } from '../ports/event-bus.port';

export type AlbumCoverUpdatedPayload = {
  id: string;
};

export class AlbumCoverUpdatedEvent implements Event<AlbumCoverUpdatedPayload> {
  public readonly name = 'album.cover-updated';

  constructor(public readonly payload: AlbumCoverUpdatedPayload) {}
}
