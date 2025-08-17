import { Event } from '../../ports/event-bus/types';
import { AlbumEventPayload } from './types';

export class AlbumUpdatedEvent extends Event<AlbumEventPayload> {
  public readonly name = 'album.updated';

  constructor(public readonly payload: AlbumEventPayload) {
    super();
  }
}
