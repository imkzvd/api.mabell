import { Event } from '@core/app/common/ports/event-bus.port';
import { AlbumId } from '@core/domain/components/album/types';
import { AlbumType } from '@core/domain/components/album/constants/album-types';

export type AlbumCoverDeletedEventPayload = {
  id: AlbumId;
  name: string;
  artists: { id: string; name: string }[];
  type: AlbumType;
  cover: string | null;
};

export class AlbumCoverDeletedEvent extends Event<AlbumCoverDeletedEventPayload> {
  public readonly name = 'album.cover-deleted';

  constructor(public readonly payload: AlbumCoverDeletedEventPayload) {
    super();
  }
}
