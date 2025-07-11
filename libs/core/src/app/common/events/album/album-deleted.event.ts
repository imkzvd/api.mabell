import { Event } from '@core/app/common/ports/event-bus.port';
import { AlbumId } from '@core/domain/components/album/types';

export type AlbumDeletedEventPayload = {
  id: AlbumId;
};

export class AlbumDeletedEvent extends Event<AlbumDeletedEventPayload> {
  public readonly name = 'album.deleted';

  constructor(public readonly payload: AlbumDeletedEventPayload) {
    super();
  }
}
