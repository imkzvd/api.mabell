import { Event } from '@core/app/common/ports/event-bus.port';
import { AlbumId } from '@core/domain/components/album/types';

export type AlbumsDeletedEventPayload = {
  ids: AlbumId[];
};

export class AlbumsDeletedEvent extends Event<AlbumsDeletedEventPayload> {
  public readonly name = 'albums.deleted';

  constructor(public readonly payload: AlbumsDeletedEventPayload) {
    super();
  }
}
