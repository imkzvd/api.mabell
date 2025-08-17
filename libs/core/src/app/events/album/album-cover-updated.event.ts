import { Event } from '../../ports';
import { AlbumId } from '../../../../domain/components/album';

export type AlbumCoverUpdatedEventPayload = {
  id: AlbumId;
  name: string;
  artists: { id: string; name: string }[];
  cover: string | null;
};

export class AlbumCoverUpdatedEvent extends Event<AlbumCoverUpdatedEventPayload> {
  public readonly name = 'album.cover-updated';

  constructor(public readonly payload: AlbumCoverUpdatedEventPayload) {
    super();
  }
}
