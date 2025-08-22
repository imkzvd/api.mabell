import { Event } from '../../ports';
import { AlbumEventPayload } from './types';

export class AlbumCreatedEvent extends Event<AlbumEventPayload> {
  public readonly name = 'album.created';

  constructor(public readonly payload: AlbumEventPayload) {
    super();
  }
}
