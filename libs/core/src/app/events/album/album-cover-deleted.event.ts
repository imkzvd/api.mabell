import { Event } from '../../ports/event-bus/types';
import { AlbumEventPayload } from './types';

export class AlbumCoverDeletedEvent extends Event<AlbumEventPayload> {
  public readonly name = 'album.cover-deleted';

  constructor(public readonly payload: AlbumEventPayload) {
    super();
  }
}
