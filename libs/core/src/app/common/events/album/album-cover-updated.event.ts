import { Event } from '@core/app/common/ports/event-bus.port';
import { AlbumId } from '@core/domain/components/album/types';
import { AlbumType } from '@core/domain/components/album/constants/album-types';

export type AlbumCoverUpdatedEventPayload = {
  id: AlbumId;
  name: string;
  artists: { id: string; name: string }[];
  type: AlbumType;
  cover: string | null;
};

export class AlbumCoverUpdatedEvent extends Event<AlbumCoverUpdatedEventPayload> {
  public readonly name = 'album.cover-updated';

  constructor(public readonly payload: AlbumCoverUpdatedEventPayload) {
    super();
  }
}
