import { Event } from '@core/app/common/ports/event-bus.port';
import { AlbumId } from '@core/domain/components/album/types';
export type AlbumUpdatedEventPayload = {
  id: AlbumId;
  name: string;
  artists: { id: string; name: string }[];
  cover: string | null;
};

export class AlbumUpdatedEvent extends Event<AlbumUpdatedEventPayload> {
  public readonly name = 'album.updated';

  constructor(public readonly payload: AlbumUpdatedEventPayload) {
    super();
  }
}
