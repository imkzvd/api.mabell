import { Event } from '../../ports';
import { AlbumId } from '../../../../domain/components/album';

export type AlbumsDeletedEventPayload = {
  ids: AlbumId[];
};

export class AlbumsDeletedEvent extends Event<AlbumsDeletedEventPayload> {
  public readonly name = 'albums.deleted';

  constructor(public readonly payload: AlbumsDeletedEventPayload) {
    super();
  }
}
