import { Event } from '@core/app/common/ports/event-bus.port';
import { AlbumId } from '@core/domain/components/album/types';
import { AlbumType } from '@core/domain/components/album/constants/album-types';

export type AlbumArtistsUpdatedEventPayload = {
  id: AlbumId;
  name: string;
  artists: { id: string; name: string }[];
  type: AlbumType;
  cover: string | null;
};

export class AlbumArtistsUpdatedEvent extends Event<AlbumArtistsUpdatedEventPayload> {
  public readonly name = 'album.artists-updated';

  constructor(public readonly payload: AlbumArtistsUpdatedEventPayload) {
    super();
  }
}
