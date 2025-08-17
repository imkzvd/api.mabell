import { Event } from '../../ports';
import { AlbumId } from '../../../../domain/components/album';

export type AlbumCoverDeletedEventPayload = {
  id: AlbumId;
  name: string;
  artists: { id: string; name: string }[];
  cover: string | null;
};

export class AlbumCoverDeletedEvent extends Event<AlbumCoverDeletedEventPayload> {
  public readonly name = 'album.cover-deleted';

  constructor(public readonly payload: AlbumCoverDeletedEventPayload) {
    super();
  }
}
