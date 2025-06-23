import { Event } from '../ports/event-bus.port';
import { AlbumId } from '../../../domain/components/album/types';

export type AlbumDeletedPayload = {
  id: AlbumId;
};

export class AlbumDeletedEvent implements Event<AlbumDeletedPayload> {
  public readonly name = 'album.deleted';

  constructor(public readonly payload: AlbumDeletedPayload) {}
}
