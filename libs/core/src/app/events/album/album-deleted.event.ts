import { Event } from '../../ports';
import { AlbumId } from '../../../../domain/components/album';

export type AlbumDeletedEventPayload = {
  id: AlbumId;
};

export class AlbumDeletedEvent extends Event<AlbumDeletedEventPayload> {
  public readonly name = 'album.deleted';

  constructor(public readonly payload: AlbumDeletedEventPayload) {
    super();
  }
}
