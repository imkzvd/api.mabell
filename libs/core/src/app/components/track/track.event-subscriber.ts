import { TrackService } from './track.service';
import { EventBus } from '../../common/ports/event-bus.port';
import { ArtistDeletedEvent } from '../../common/events/artist-deleted.event';
import { AlbumDeletedEvent } from '../../common/events/album-deleted.event';

export class TrackEventSubscriber {
  constructor(
    private readonly _EB: EventBus,
    private readonly _trackService: TrackService,
  ) {
    this._EB.subscribe(ArtistDeletedEvent, ({ id }) => {
      void this._trackService.deleteByArtistId(id);
    });

    this._EB.subscribe(AlbumDeletedEvent, ({ id }) => {
      void this._trackService.deleteByAlbumId(id);
    });
  }
}
