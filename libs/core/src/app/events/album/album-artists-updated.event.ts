import { Event } from '../../ports/event-bus/types';
import { AlbumEventPayload } from './types';

export class AlbumArtistsUpdatedEvent extends Event<AlbumEventPayload> {
  public readonly name = 'album.artists-updated';

  constructor(public readonly payload: AlbumEventPayload) {
    super();
  }
}
