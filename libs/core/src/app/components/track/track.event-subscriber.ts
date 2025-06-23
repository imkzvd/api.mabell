import { Inject } from '@nestjs/common';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../common/ports/event-bus.port';
import { ArtistDeletedEvent } from '../../common/events/artist-deleted.event';
import { TrackService } from './track.service';
import { AlbumDeletedEvent } from '../../common/events/album-deleted.event';

export class TrackEventSubscriber {
  constructor(
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
    @Inject(TrackService) private readonly _trackService: TrackService,
  ) {
    this._eb.subscribe(ArtistDeletedEvent, ({ id }) => {
      void this._trackService.deleteByArtistId(id);
    });

    this._eb.subscribe(AlbumDeletedEvent, ({ id }) => {
      void this._trackService.deleteByAlbumId(id);
    });
  }
}
