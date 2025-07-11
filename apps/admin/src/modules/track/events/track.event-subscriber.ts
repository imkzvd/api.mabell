import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { Inject } from '@nestjs/common';
import { EventBus } from '@infrastructure/event-bus';
import { AlbumDeletedEvent } from '@core/app/common/events/album/album-deleted.event';
import { TrackDeleteService } from '@core/app/components/track/services/track-delete.service';
import { DeleteTracksOnAlbumDeletedEventHandler } from '@core/app/components/track/event-handlers/delete-tracks-on-album-deleted.event-handler';
import { DeleteTracksOnArtistDeletedEventHandler } from '@core/app/components/track/event-handlers/delete-tracks-on-artist-deleted.event-handler';
import { ArtistDeletedEvent } from '@core/app/common/events/artist/artist-deleted.event';

export class TrackEventSubscriber {
  constructor(
    @Inject(EventBus) private readonly _EB: EventBusPort,
    @Inject(TrackDeleteService) private readonly _service: TrackDeleteService,
  ) {
    const deleteTracksOnArtistDeletedEventHandler = new DeleteTracksOnArtistDeletedEventHandler(
      this._service,
    );
    const deleteTracksOnAlbumDeletedEventHandler = new DeleteTracksOnAlbumDeletedEventHandler(
      this._service,
    );

    this._EB.subscribe(ArtistDeletedEvent, deleteTracksOnArtistDeletedEventHandler);
    this._EB.subscribe(AlbumDeletedEvent, deleteTracksOnAlbumDeletedEventHandler);
  }
}
