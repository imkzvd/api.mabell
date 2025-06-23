import { Event } from '../ports/event-bus.port';
import { AlbumId } from '@core/domain/components/album/types';

export type AlbumUpdatedPayload = {
  id: AlbumId;
};

export class AlbumUpdatedEvent implements Event<AlbumUpdatedPayload> {
  public readonly name = 'album.updated';

  constructor(public readonly payload: AlbumUpdatedPayload) {}
}
