import { EventBus } from '../../common/ports/event-bus.port';
import { AlbumService } from './album.service';
import { ArtistDeletedEvent } from '../../common/events/artist-deleted.event';

export class AlbumEventSubscriber {
  constructor(
    private readonly _eb: EventBus,
    private readonly _albumService: AlbumService,
  ) {
    this._eb.subscribe(ArtistDeletedEvent, ({ id }) => {
      void this._albumService.deleteAlbumsByArtistId(id);
    });
  }
}
