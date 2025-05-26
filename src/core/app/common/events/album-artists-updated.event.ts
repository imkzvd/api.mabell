import { Event } from '../ports/event-bus.port';

export type AlbumArtistsUpdatedPayload = {
  id: string;
  artistIds: string[];
};

export class AlbumArtistsUpdatedEvent implements Event<AlbumArtistsUpdatedPayload> {
  public readonly name = 'album.artists-updated';

  constructor(public readonly payload: AlbumArtistsUpdatedPayload) {}
}
