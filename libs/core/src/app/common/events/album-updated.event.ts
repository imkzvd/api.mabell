import { Event } from '@core/app/common/ports/event-bus.port';
import { AlbumId } from '@core/domain/components/album/types';
import { AlbumType } from '@core/domain/components/album/constants/album-types';

export type AlbumUpdatedEventPayload = {
  id: AlbumId;
  name: string;
  artists: { id: string; name: string }[];
  type: AlbumType;
  cover: string | null;
};

export class AlbumUpdatedEvent extends Event<AlbumUpdatedEventPayload> {
  public readonly name = 'album.updated';

  constructor(public readonly payload: AlbumUpdatedEventPayload) {
    super();
  }
}
