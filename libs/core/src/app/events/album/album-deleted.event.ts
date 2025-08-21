import { Event } from '../../ports/event-bus/types';
import { AlbumId } from '../../../domain/components/album/types';

export type AlbumDeletedEventPayload = {
  id: AlbumId;
};

export class AlbumDeletedEvent extends Event<AlbumDeletedEventPayload> {
  public readonly name = 'album.deleted';

  constructor(public readonly payload: AlbumDeletedEventPayload) {
    super();
  }
}
