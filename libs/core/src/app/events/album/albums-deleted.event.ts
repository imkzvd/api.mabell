import { Event } from '../../ports/event-bus/types';
import { AlbumId } from '../../../domain/components/album/types';

export type AlbumsDeletedEventPayload = {
  ids: AlbumId[];
};

export class AlbumsDeletedEvent extends Event<AlbumsDeletedEventPayload> {
  public readonly name = 'albums.deleted';

  constructor(public readonly payload: AlbumsDeletedEventPayload) {
    super();
  }
}
