import { Inject } from '@nestjs/common';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../common/ports/event-bus.port';
import { AlbumService } from './album.service';
import { ArtistDeletedEvent } from '../../common/events/artist-deleted.event';

export class AlbumEventSubscriber {
  constructor(
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
    @Inject(AlbumService) private readonly _albumService: AlbumService,
  ) {
    this._eb.subscribe(ArtistDeletedEvent, ({ id }) => {
      void this._albumService.deleteAlbumsByArtistId(id);
    });
  }
}
