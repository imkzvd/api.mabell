import { Event } from '../ports/event-bus.port';
import { AlbumId } from '../../../domain/components/album/types';

export type AlbumCoverUpdatedPayload = {
  id: AlbumId;
};

export class AlbumCoverUpdatedEvent implements Event<AlbumCoverUpdatedPayload> {
  public readonly name = 'album.cover-updated';

  constructor(public readonly payload: AlbumCoverUpdatedPayload) {}
}
