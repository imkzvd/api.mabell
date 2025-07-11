import { Event } from '@core/app/common/ports/event-bus.port';
import { AlbumId } from '@core/domain/components/album/types';

export type AlbumCreatedEventPayload = {
  id: AlbumId;
  name: string;
  artists: { id: string; name: string }[];
  cover: string | null;
};

export class AlbumCreatedEvent extends Event<AlbumCreatedEventPayload> {
  public readonly name = 'album.created';

  constructor(public readonly payload: AlbumCreatedEventPayload) {
    super();
  }
}
