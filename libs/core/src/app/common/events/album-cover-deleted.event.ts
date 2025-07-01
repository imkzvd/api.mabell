import { Event } from '../ports/event-bus.port';
import { AlbumId } from '@core/domain/components/album/types';

export type AlbumCoverDeletedPayload = {
  id: AlbumId;
};

export class AlbumCoverDeletedEvent implements Event<AlbumCoverDeletedPayload> {
  public readonly name = 'album.cover-deleted';

  constructor(public readonly payload: AlbumCoverDeletedPayload) {}
}
