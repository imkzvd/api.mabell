import { Event } from '../ports/event-bus.port';
import { AlbumId } from '../../../domain/components/album/types';

export type AlbumCreatedPayload = {
  id: AlbumId;
};

export class AlbumCreatedEvent implements Event<AlbumCreatedPayload> {
  public readonly name = 'album.created';

  constructor(public readonly payload: AlbumCreatedPayload) {}
}
