import { Event } from '../ports/event-bus.port';
import { AlbumId } from '../../../domain/components/album/types';

export type AlbumArtistsUpdatedPayload = {
  id: AlbumId;
};

export class AlbumArtistsUpdatedEvent implements Event<AlbumArtistsUpdatedPayload> {
  public readonly name = 'album.artists-updated';

  constructor(public readonly payload: AlbumArtistsUpdatedPayload) {}
}
