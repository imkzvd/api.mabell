import { EventHandler } from '@core/app/common/ports/event-bus.port';
import { ArtistDeletedEvent } from '@core/app/common/events/artist/artist-deleted.event';
import { AlbumDeleteService } from '@core/app/components/album/services/album-delete.service';

export class DeleteAlbumsOnArtistDeletedEventHandler extends EventHandler<ArtistDeletedEvent> {
  constructor(private readonly _service: AlbumDeleteService) {
    super();
  }

  handle({ payload }: ArtistDeletedEvent) {
    void this._service.deleteByArtistId(payload.id);
  }
}
