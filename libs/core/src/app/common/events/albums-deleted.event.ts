import { Event } from '../ports/event-bus.port';
import { AlbumId } from '@core/domain/components/album/types';

export type AlbumsDeletedPayload = {
  ids: AlbumId[];
};

export class AlbumsDeletedEvent implements Event<AlbumsDeletedPayload> {
  public readonly name = 'albums.deleted';

  constructor(public readonly payload: AlbumsDeletedPayload) {}
}
