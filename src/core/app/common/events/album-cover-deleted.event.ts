import { Event } from '../ports/event-bus.port';

export type AlbumCoverDeletedPayload = {
  id: string;
};

export class AlbumCoverDeletedEvent implements Event<AlbumCoverDeletedPayload> {
  public readonly name = 'album.cover-deleted';

  constructor(public readonly payload: AlbumCoverDeletedPayload) {}
}
