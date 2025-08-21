import { Event } from '../../ports/event-bus/types';
import { AlbumEventPayload } from './types';

export class AlbumCoverUpdatedEvent extends Event<AlbumEventPayload> {
  public readonly name = 'album.cover-updated';

  constructor(public readonly payload: AlbumEventPayload) {
    super();
  }
}
