import { Event } from '../../ports';
import { AlbumId } from '../../../../domain/components/album';

export type AlbumArtistsUpdatedEventPayload = {
  id: AlbumId;
  name: string;
  artists: { id: string; name: string }[];
  cover: string | null;
};

export class AlbumArtistsUpdatedEvent extends Event<AlbumArtistsUpdatedEventPayload> {
  public readonly name = 'album.artists-updated';

  constructor(public readonly payload: AlbumArtistsUpdatedEventPayload) {
    super();
  }
}
