import { Inject } from '@nestjs/common';
import { EventBus } from '@infrastructure/event-bus';
import { DeleteAlbumsOnArtistDeletedEventHandler } from '@core/app/components/album/event-handlers/delete-albums-on-artist-deleted.event-handler';
import { AlbumDeleteService } from '@core/app/components/album/services/album-delete.service';
import { ArtistDeletedEvent } from '@core/app/common/events/artist/artist-deleted.event';

export class AlbumEventSubscriber {
  constructor(
    @Inject(EventBus) private readonly _EB: EventBus,
    @Inject(AlbumDeleteService) private readonly _service: AlbumDeleteService,
  ) {
    const handler = new DeleteAlbumsOnArtistDeletedEventHandler(this._service);

    this._EB.subscribe(ArtistDeletedEvent, handler);
  }
}
